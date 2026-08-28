import React, { createContext, useContext, useState, useEffect } from 'react';
import { initialBusinessProfile } from '../data/businessProfileData';
import businessAnalysisService from '../services/businessAnalysisService';
import apiClient from '../services/apiClient';

const BusinessAnalysisContext = createContext(null);

export const ANALYSIS_STEPS = [
  'Connecting to Enterprise Compliance Data Layer...',
  'Evaluating Statutory & Environmental Compliance Rules...',
  'Mapping Regulatory Approvals & Licences in PostgreSQL...',
  'Generating Compliance Tasks & Document Vault Checklists...',
  'Matching Eligible Central & State Government Schemes...',
  'Synthesizing Executive Business Intelligence Insights...',
];

export function BusinessAnalysisProvider({ children }) {
  const [businessProfile, setBusinessProfile] = useState(initialBusinessProfile);
  const [backendProfileId, setBackendProfileId] = useState(null);
  const [isBackendConnected, setIsBackendConnected] = useState(false);

  const [analysisResult, setAnalysisResult] = useState(() => {
    return businessAnalysisService.getQuickSummary(initialBusinessProfile);
  });
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [hasAnalysisRun, setHasAnalysisRun] = useState(true);

  // Initialize and check backend connectivity
  useEffect(() => {
    async function initBackend() {
      try {
        const profiles = await apiClient.getBusinessProfiles();
        if (profiles && profiles.length > 0) {
          const primary = profiles[0];
          setBackendProfileId(primary.id);
          setIsBackendConnected(true);

          // Try fetching latest analysis from backend
          try {
            const backendAnalysis = await apiClient.getLatestAnalysis(primary.id);
            if (backendAnalysis && backendAnalysis.analysis_result) {
              setAnalysisResult(backendAnalysis.analysis_result);
            }
          } catch (e) {
            // If no analysis yet on backend, keep local default
          }
        }
      } catch (err) {
        // Backend offline: continue seamlessly in local prototype mode
        setIsBackendConnected(false);
      }
    }
    initBackend();
  }, []);

  const updateBusinessProfile = async (updatedData) => {
    setBusinessProfile(updatedData);

    // If backend is active, persist updates
    if (isBackendConnected && backendProfileId) {
      try {
        await apiClient.updateBusinessProfile(backendProfileId, {
          business_name: updatedData.businessName,
          business_type: updatedData.businessType,
          industry: updatedData.industry,
          sector: updatedData.sector,
          company_size: updatedData.companySize,
          employee_count: parseInt(updatedData.employees, 10) || 1,
          annual_turnover: updatedData.annualTurnover,
          city: updatedData.city,
          state: updatedData.state,
          manufacturing_activity: updatedData.manufacturingActivity === 'Yes' || updatedData.manufacturingActivity === true,
          import_activities: updatedData.importActivities === 'Yes' || updatedData.importActivities === true,
          export_activities: updatedData.exportActivities === 'Yes' || updatedData.exportActivities === true,
          environmental_impact: updatedData.environmentalImpact || 'Moderate',
          operating_status: updatedData.operatingStatus || 'Active',
          gstin: updatedData.gstin,
          udyam_number: updatedData.udyamNumber,
        });
      } catch (e) {
        console.warn('Backend sync failed, state retained locally.');
      }
    }
  };

  const runAnalysis = async (profileOverride = null, onComplete = null) => {
    const targetProfile = profileOverride || businessProfile;
    setIsAnalyzing(true);
    setCurrentStepIndex(0);

    // Stepped realistic UX progression
    for (let i = 0; i < ANALYSIS_STEPS.length; i++) {
      setCurrentStepIndex(i);
      await new Promise((r) => setTimeout(r, 200));
    }

    let finalResult = null;

    // 1. Try Backend Execution if connected
    if (isBackendConnected && backendProfileId) {
      try {
        const backendResp = await apiClient.runAnalysis(backendProfileId);
        if (backendResp && backendResp.analysis_result) {
          finalResult = backendResp.analysis_result;
        }
      } catch (err) {
        console.warn('Backend analysis failed, executing in-memory engine fallback:', err);
      }
    }

    // 2. Local Engine Fallback (Deterministic & Resilient)
    if (!finalResult) {
      finalResult = await businessAnalysisService.analyzeBusinessProfile(targetProfile);
    }

    setAnalysisResult(finalResult);
    setHasAnalysisRun(true);
    setIsAnalyzing(false);

    if (onComplete) {
      onComplete(finalResult);
    }
    return finalResult;
  };

  return (
    <BusinessAnalysisContext.Provider
      value={{
        businessProfile,
        backendProfileId,
        isBackendConnected,
        updateBusinessProfile,
        analysisResult,
        isAnalyzing,
        currentStepIndex,
        currentStepText: ANALYSIS_STEPS[currentStepIndex],
        analysisSteps: ANALYSIS_STEPS,
        hasAnalysisRun,
        runAnalysis,
      }}
    >
      {children}
    </BusinessAnalysisContext.Provider>
  );
}

export function useBusinessAnalysis() {
  const context = useContext(BusinessAnalysisContext);
  if (!context) {
    throw new Error('useBusinessAnalysis must be used within a BusinessAnalysisProvider');
  }
  return context;
}

export default BusinessAnalysisContext;
