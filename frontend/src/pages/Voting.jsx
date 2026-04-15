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

function SkipConfirmationModal({
  confirmationState,
  onCancel,
  onConfirm,
  isSubmitting,
}) {
  if (!confirmationState) {
    return null;
  }

  const { mode, positions } = confirmationState;
  const isSinglePosition = positions.length === 1;
  const title =
    mode === "next"
      ? `Skip ${positions[0]}?`
      : "Submit Ballot With Blank Positions?";
  const description =
    mode === "next"
      ? `You have not selected a candidate for ${positions[0]}. If you continue, this position will be left blank. Only selected candidates will be recorded when you submit your ballot.`
      : `You still have ${positions.length} ${positions.length === 1 ? "position" : "positions"} without a selected candidate. If you continue, those positions will be left blank and only your selected candidates will be recorded.`;
  const confirmLabel =
    mode === "next" ? "Continue Without Selecting" : "Submit Selected Votes";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#12030f]/80 px-4 backdrop-blur-sm">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="skip-modal-title"
        className="w-full max-w-2xl rounded-[2rem] border border-white/10 bg-[#2D0D25] p-6 md:p-8 text-white shadow-[0_20px_80px_rgba(0,0,0,0.45)]"
      >
        <div className="flex items-start justify-between gap-6">
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-[#FFA700] mb-3">
              Confirmation Required
            </p>
            <h2 id="skip-modal-title" className="text-3xl font-bold tracking-tight">
              {title}
            </h2>
          </div>
          <button
            type="button"
            onClick={onCancel}
            disabled={isSubmitting}
            className="text-white/50 hover:text-white transition-colors text-sm uppercase tracking-[0.18em] disabled:opacity-40"
          >
            Close
          </button>
        </div>

        <p className="mt-5 text-white/75 leading-relaxed">
          {description}
        </p>

        {!isSinglePosition && (
          <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 px-5 py-4">
            <p className="text-sm uppercase tracking-[0.18em] text-white/55 mb-3">
              Positions To Leave Blank
            </p>
            <div className="flex flex-wrap gap-2">
              {positions.map((position) => (
                <span
                  key={position}
                  className="rounded-full border border-[#FFA700]/25 bg-[#FFA700]/10 px-3 py-1 text-sm text-[#FFD68A]"
                >
                  {position}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onCancel}
            disabled={isSubmitting}
            className="rounded-xl border border-white/15 px-5 py-3 text-white/80 hover:bg-white/5 transition-colors disabled:opacity-40"
          >
            Go Back And Review
          </button>
          <Button
            type="button"
            className="sm:w-auto px-6"
            onClick={onConfirm}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Processing..." : confirmLabel}
          </Button>
        </div>
      </div>
    </div>
  );
}

function ReviewVotesModal({
  selectedVotes,
  positions,
  onCancel,
  onConfirm,
  isSubmitting,
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#12030f]/80 px-4 py-6 backdrop-blur-sm">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="review-modal-title"
        className="w-full max-w-3xl max-h-[90vh] flex flex-col rounded-[2rem] border border-white/10 bg-[#2D0D25] p-6 md:p-8 text-white shadow-[0_20px_80px_rgba(0,0,0,0.45)]"
      >
        <div className="flex items-start justify-between gap-6 shrink-0">
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-[#FFA700] mb-3">
              Review Your Ballot
            </p>
            <h2 id="review-modal-title" className="text-3xl font-bold tracking-tight">
              Vote Summary
            </h2>
          </div>
          <button
            type="button"
            onClick={onCancel}
            disabled={isSubmitting}
            className="text-white/50 hover:text-white transition-colors text-sm uppercase tracking-[0.18em] disabled:opacity-40"
          >
            Close
          </button>
        </div>

        <div className="mt-6 flex-1 overflow-y-auto pr-2 -mr-2">
          <div className="grid gap-3 sm:grid-cols-2">
            {positions.map((positionGroup) => {
              const selectedId = selectedVotes[positionGroup.position];
              const candidate = positionGroup.candidates.find(
                (c) => c.id === selectedId
              );

              return (
                <div
                  key={positionGroup.position}
                  className="rounded-xl border border-white/10 bg-white/5 p-4 flex flex-col"
                >
                  <span className="text-[10px] sm:text-xs uppercase tracking-wider text-white/50 mb-2">
                    {positionGroup.title}
                  </span>
                  {candidate ? (
                    <div>
                      <div className="font-medium text-white">{candidate.name}</div>
                      <div className="text-[10px] sm:text-xs text-[#FFA700] uppercase tracking-wider mt-1">
                        {candidate.partylist}
                      </div>
                    </div>
                  ) : (
                    <span className="text-white/40 italic text-sm">Left Blank</span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-8 shrink-0 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onCancel}
            disabled={isSubmitting}
            className="rounded-xl border border-white/15 px-5 py-3 text-white/80 hover:bg-white/5 transition-colors disabled:opacity-40"
          >
            Edit Ballot
          </button>
          <Button
            type="button"
            className="sm:w-auto px-6"
            onClick={onConfirm}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Confirm & Submit"}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function Voting() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { token, updateUser, user } = useAuth();
  const [selectedVotes, setSelectedVotes] = useState({});
  const [skippedPositions, setSkippedPositions] = useState({});
  const [currentPositionIndex, setCurrentPositionIndex] = useState(0);
  const [statusMessage, setStatusMessage] = useState("");
  const [confirmationState, setConfirmationState] = useState(null);
  const [isReviewingVotes, setIsReviewingVotes] = useState(false);

  const { data, isLoading, error } = useQuery({
    queryKey: ["candidates"],
    queryFn: () => apiRequest("/api/candidates"),
  });

  const positions = groupCandidatesByPosition(data?.candidates || []);
  const currentPosition = positions[currentPositionIndex];
  const selectedCount = positions.filter(
    (positionGroup) => selectedVotes[positionGroup.position]
  ).length;
  const skippedCount = positions.filter(
    (positionGroup) => skippedPositions[positionGroup.position]
  ).length;
  const reviewedCount = positions.filter(
    (positionGroup) =>
      selectedVotes[positionGroup.position] || skippedPositions[positionGroup.position]
  ).length;
  const unresolvedPositions = positions
    .filter(
      (positionGroup) =>
        !selectedVotes[positionGroup.position] &&
        !skippedPositions[positionGroup.position]
    )
    .map((positionGroup) => positionGroup.position);
  const isCurrentPositionSelected = Boolean(
    currentPosition && selectedVotes[currentPosition.position]
  );
  const isCurrentPositionSkipped = Boolean(
    currentPosition && skippedPositions[currentPosition.position]
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
    const nextCandidateId = selectedVotes[position] === candidateId ? null : candidateId;

    setStatusMessage("");
    setSelectedVotes((prev) => ({
      ...prev,
      [position]: nextCandidateId,
    }));
    setSkippedPositions((prev) => {
      if (!prev[position]) {
        return prev;
      }

      const next = { ...prev };
      delete next[position];
      return next;
    });
  };

  const markPositionsSkipped = (positionsToSkip) => {
    setSkippedPositions((prev) => {
      const next = { ...prev };

      positionsToSkip.forEach((position) => {
        next[position] = true;
      });

      return next;
    });
  };

  const buildCandidateIds = () => Object.values(selectedVotes).filter(Boolean);

  const requestConfirmation = (mode, positionsToConfirm) => {
    setConfirmationState({ mode, positions: positionsToConfirm });
  };

  const closeConfirmation = () => {
    if (voteMutation.isPending) {
      return;
    }

    setConfirmationState(null);
  };

  const handleConfirmedProceed = () => {
    if (!confirmationState) {
      return;
    }

    const { mode, positions: positionsToSkip } = confirmationState;
    markPositionsSkipped(positionsToSkip);
    setConfirmationState(null);

    if (mode === "next") {
      setStatusMessage(
        `${positionsToSkip[0]} will be left blank. You can still go back and choose a candidate before final submission.`
      );

      if (currentPositionIndex < positions.length - 1) {
        setCurrentPositionIndex(currentPositionIndex + 1);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }

      return;
    }

    setStatusMessage("");
    setIsReviewingVotes(true);
  };

  const handleNext = () => {
    if (!currentPosition) {
      return;
    }

    if (!isCurrentPositionSelected && !isCurrentPositionSkipped) {
      requestConfirmation("next", [currentPosition.position]);
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
    if (!positions.length) {
      return;
    }

    if (unresolvedPositions.length > 0) {
      requestConfirmation("submit", unresolvedPositions);
      return;
    }

    setStatusMessage("");
    setIsReviewingVotes(true);
  };

  const handleFinalSubmit = () => {
    setStatusMessage("");
    voteMutation.mutate(buildCandidateIds());
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
            Ballot progress: {reviewedCount} / {positions.length} reviewed
          </span>
          <span>
            Selected: {selectedCount} | Left blank: {skippedCount}
          </span>
        </div>

        <div className="px-6 md:px-14 pt-2 text-white/60 text-sm tracking-wide flex justify-end">
          <span>
            {currentPositionIndex + 1} of {positions.length}
          </span>
        </div>

        {statusMessage && (
          <div className="mx-6 md:mx-14 mt-4 rounded-xl border border-[#FFA700]/30 bg-[#FFA700]/10 px-4 py-3 text-sm text-[#FFD68A]">
            {statusMessage}
          </div>
        )}

        {isCurrentPositionSkipped && !isCurrentPositionSelected && (
          <div className="mx-6 md:mx-14 mt-4 rounded-xl border border-sky-300/20 bg-sky-400/10 px-4 py-3 text-sm text-sky-100">
            {currentPosition.position} is currently left blank. You can still select a candidate before submitting your ballot.
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
            <Button className="w-full" onClick={handleNext} disabled={voteMutation.isPending}>
              Next
            </Button>
          ) : (
            <Button className="w-full" onClick={handleSubmit} disabled={voteMutation.isPending}>
              {voteMutation.isPending ? "Submitting..." : "Submit"}
            </Button>
          )}
        </div>
      </div>

      <SkipConfirmationModal
        confirmationState={confirmationState}
        onCancel={closeConfirmation}
        onConfirm={handleConfirmedProceed}
        isSubmitting={voteMutation.isPending}
      />

      {isReviewingVotes && (
        <ReviewVotesModal
          selectedVotes={selectedVotes}
          positions={positions}
          onCancel={() => setIsReviewingVotes(false)}
          onConfirm={handleFinalSubmit}
          isSubmitting={voteMutation.isPending}
        />
      )}

      <Footer />
    </div>
  );
}
