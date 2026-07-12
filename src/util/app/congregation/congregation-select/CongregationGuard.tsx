import { useState, useEffect } from "react";
import { CongregationSelectModal } from "./congregation-select-modal/CongregationSelectModal";
import { OnboardingPublisherModal } from "./onboarding-publisher-modal/OnboardingPublisherModal";
import { hasSelectedCongregation } from "@util/app/congregation/utils";

export function CongregationGuard() {
  const [showCongregationModal, setShowCongregationModal] = useState(false);
  const [showPublisherModal, setShowPublisherModal] = useState(false);

  useEffect(() => {
    if (!hasSelectedCongregation()) {
      setShowCongregationModal(true);
    }
  }, []);

  const handleCongregationDismiss = () => {
    setShowCongregationModal(false);
    if (hasSelectedCongregation()) {
      setShowPublisherModal(true);
    }
  };

  return (
    <>
      <CongregationSelectModal
        isOpen={showCongregationModal}
        onDismiss={handleCongregationDismiss}
      />
      <OnboardingPublisherModal
        isOpen={showPublisherModal}
        onDismiss={() => setShowPublisherModal(false)}
      />
    </>
  );
}
