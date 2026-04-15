import React, { useEffect, useRef, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import CandidatesBanner from "../components/Voting/CandidatesBanner";
import uclmccs from "../assets/uclmccs.png";
import uclmpsits from "../assets/uclmpsits.png";
import Footer from "../components/Footer";
import Button from "../components/Button";
import { useAuth } from "../context/useAuth";
import { groupCandidatesByPosition } from "../data/election";
import { apiRequest } from "../lib/api";

const FadeInOnScroll = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 },
    );

    const current = domRef.current;
    if (current) observer.observe(current);
    return () => current && observer.unobserve(current);
  }, []);

  return (
    <div
      ref={domRef}
      className={`transition-all duration-700 ease-out will-change-transform ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[60px]"
      }`}
    >
      {children}
    </div>
  );
};

function VotingState({ title, message, actionLabel, onAction }) {
  return (
    <div className="flex flex-col min-h-screen bg-[#34102A] text-white">
      <Header />
      <main className="flex-1 flex items-center justify-center px-6 text-center">
        <div className="max-w-xl">
          <h1 className="text-4xl font-bold tracking-tight mb-4">{title}</h1>
          <p className="text-white/75 leading-relaxed mb-8">{message}</p>
          {actionLabel && onAction && (
            <div className="max-w-xs mx-auto">
              <Button onClick={onAction}>{actionLabel}</Button>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default function Voting() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { token, updateUser, user } = useAuth();
  const [selectedVotes, setSelectedVotes] = useState({});
  const [currentPositionIndex, setCurrentPositionIndex] = useState(0);
  const [statusMessage, setStatusMessage] = useState("");

  const { data, isLoading, error } = useQuery({
    queryKey: ["candidates"],
    queryFn: () => apiRequest("/api/candidates"),
  });

  const positions = groupCandidatesByPosition(data?.candidates || []);
  const currentPosition = positions[currentPositionIndex];
  const selectedCount = positions.filter(
    (positionGroup) => selectedVotes[positionGroup.position]
  ).length;
  const isBallotComplete = positions.length > 0 && selectedCount === positions.length;
  const isCurrentPositionSelected = Boolean(
    currentPosition && selectedVotes[currentPosition.position]
  );

  const voteMutation = useMutation({
    mutationFn: (candidateIds) =>
      apiRequest("/api/votes", {
        method: "POST",
        token,
        body: { candidateIds },
      }),
    onSuccess: (response) => {
      updateUser(response.user);
      queryClient.invalidateQueries({ queryKey: ["results"] });
      navigate("/results", { replace: true });
    },
    onError: (mutationError) => {
      setStatusMessage(mutationError.message);
    },
  });

  const handleVote = (position, candidateId) => {
    setStatusMessage("");
    setSelectedVotes((prev) => ({
      ...prev,
      [position]: prev[position] === candidateId ? null : candidateId,
    }));
  };

  const handleNext = () => {
    if (!isCurrentPositionSelected) {
      setStatusMessage(`Select a candidate for ${currentPosition.position} before continuing.`);
      return;
    }

    if (currentPositionIndex < positions.length - 1) {
      setCurrentPositionIndex(currentPositionIndex + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleBack = () => {
    if (currentPositionIndex > 0) {
      setCurrentPositionIndex(currentPositionIndex - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleSubmit = () => {
    if (!isBallotComplete) {
      setStatusMessage("Select one candidate for every position before submitting your ballot.");
      return;
    }

    setStatusMessage("");
    voteMutation.mutate(
      positions.map((positionGroup) => selectedVotes[positionGroup.position])
    );
  };

  if (user?.hasVoted) {
    return (
      <VotingState
        title="Ballot Already Submitted"
        message="This account has already completed the election ballot. You can still view the live results."
        actionLabel="View Results"
        onAction={() => navigate("/results")}
      />
    );
  }

  if (isLoading) {
    return (
      <VotingState
        title="Loading Ballot"
        message="The candidate list is being prepared."
      />
    );
  }

  if (error) {
    return (
      <VotingState
        title="Unable To Load Ballot"
        message={error.message}
        actionLabel="Try Again"
        onAction={() => queryClient.invalidateQueries({ queryKey: ["candidates"] })}
      />
    );
  }

  if (!currentPosition) {
    return (
      <VotingState
        title="No Candidates Available"
        message="The ballot has not been seeded in the database yet. Run the backend SQL setup first."
      />
    );
  }

  return (
    <div className="flex flex-col">
      <Header />
      <div className="flex gap-1 items-center justify-start ml-18">
        <img
          src={uclmccs}
          alt="UCLM CCS Logo"
          className="w-[45px] h-auto object-contain"
        />
        <img
          src={uclmpsits}
          alt="UCLM PSITS Logo"
          className="w-[45px] h-auto object-contain"
        />
      </div>
      <div className="flex flex-col min-h-[50vh]">
        <div className="px-6 md:px-14 pt-4 text-white/80 text-sm tracking-wide flex justify-between gap-4">
          <span>
            Ballot progress: {selectedCount} / {positions.length}
          </span>
          <span>
            {currentPositionIndex + 1} of {positions.length}
          </span>
        </div>

        {statusMessage && (
          <div className="mx-6 md:mx-14 mt-4 rounded-xl border border-[#FFA700]/30 bg-[#FFA700]/10 px-4 py-3 text-sm text-[#FFD68A]">
            {statusMessage}
          </div>
        )}

        <FadeInOnScroll key={currentPosition.id}>
          <CandidatesBanner
            title={currentPosition.title}
            position={currentPosition.position}
            candidates={currentPosition.candidates}
            selectedCandidateId={selectedVotes[currentPosition.position]}
            onSelectCandidate={(candidateId) =>
              handleVote(currentPosition.position, candidateId)
            }
          />
        </FadeInOnScroll>
      </div>

      <div className="flex flex-row justify-center gap-6 md:gap-12 w-full px-4 mb-2">
        {currentPositionIndex > 0 && (
          <div className="w-48 md:w-[250px]">
            <Button className="w-full" onClick={handleBack} disabled={voteMutation.isPending}>
              Back
            </Button>
          </div>
        )}
        <div className="w-48 md:w-[250px]">
          {currentPositionIndex < positions.length - 1 ? (
            <Button className="w-full" onClick={handleNext} disabled={!isCurrentPositionSelected || voteMutation.isPending}>
              Next
            </Button>
          ) : (
            <Button className="w-full" onClick={handleSubmit} disabled={!isBallotComplete || voteMutation.isPending}>
              {voteMutation.isPending ? "Submitting..." : "Submit"}
            </Button>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
