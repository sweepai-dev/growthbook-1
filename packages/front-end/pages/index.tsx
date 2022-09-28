import React from "react";
import LoadingOverlay from "../components/LoadingOverlay";
import { ExperimentInterfaceStringDates } from "back-end/types/experiment";
import useApi from "../hooks/useApi";
import { useFeaturesList } from "../services/features";
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function Home(): React.ReactElement {
  const router = useRouter();
  const { data, error } = useApi<{
    experiments: ExperimentInterfaceStringDates[];
  }>(`/experiments`);

  const { features, loading, error: featuresError } = useFeaturesList(false);

  useEffect(() => {
    if (loading || !data) {
      return;
    }

    if (features.length) {
      router.replace("/features");
    } else if (data.experiments?.length) {
      router.replace("/experiments");
    } else {
      router.replace("/getstarted");
    }
  }, [features, data, loading, router]);

  if (error || featuresError) {
    return (
      <div className="alert alert-danger">
        {error?.message || featuresError?.message || "An error occurred"}
      </div>
    );
  }

  return <LoadingOverlay />;
}
