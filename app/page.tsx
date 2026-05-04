'use client';
import React from 'react';
import { AppLayout } from '@/components/Layout/AppLayout';
import { useApp } from '@/context/AppContext';

import { S01_CompanyVision } from '@/components/Sections/S01_CompanyVision';
import { S02_ContractorIndustry } from '@/components/Sections/S02_ContractorIndustry';
import { S03_BusinessModel } from '@/components/Sections/S03_BusinessModel';
import { S04_HowWeGenerateResults } from '@/components/Sections/S04_HowWeGenerateResults';
import { S05_SalesProcess } from '@/components/Sections/S05_SalesProcess';
import { S06_ServiceDelivery } from '@/components/Sections/S06_ServiceDelivery';
import { S07_OrgStructure } from '@/components/Sections/S07_OrgStructure';
import { S08_MetricsHierarchy } from '@/components/Sections/S08_MetricsHierarchy';
import { S09_KPIPlaybook } from '@/components/Sections/S09_KPIPlaybook';
import { S10_CulturePerformance } from '@/components/Sections/S10_CulturePerformance';
import { S11_ToolsSystems } from '@/components/Sections/S11_ToolsSystems';
import { S12_AccountManagement } from '@/components/Sections/S12_AccountManagement';
import { S13_OnboardingCallMastery } from '@/components/Sections/S13_OnboardingCallMastery';
import { S14_Mindset } from '@/components/Sections/S14_Mindset';
import { S15_LayeredThinking } from '@/components/Sections/S15_LayeredThinking';
import { S16_RevenuePartnerMindset } from '@/components/Sections/S16_RevenuePartnerMindset';
import { S17_WeeklyRhythm } from '@/components/Sections/S17_WeeklyRhythm';
import { S18_OtherDepartments } from '@/components/Sections/S18_OtherDepartments';
import { S19_BrandPartners } from '@/components/Sections/S19_BrandPartners';
import { S20_TimeAllocation } from '@/components/Sections/S20_TimeAllocation';

const SECTION_MAP: Record<number, React.FC> = {
  1: S01_CompanyVision,
  2: S02_ContractorIndustry,
  3: S03_BusinessModel,
  4: S04_HowWeGenerateResults,
  5: S05_SalesProcess,
  6: S06_ServiceDelivery,
  7: S07_OrgStructure,
  8: S08_MetricsHierarchy,
  9: S09_KPIPlaybook,
  10: S10_CulturePerformance,
  11: S12_AccountManagement,
  12: S13_OnboardingCallMastery,
  13: S11_ToolsSystems,
  14: S14_Mindset,
  15: S15_LayeredThinking,
  16: S16_RevenuePartnerMindset,
  17: S17_WeeklyRhythm,
  18: S18_OtherDepartments,
  19: S19_BrandPartners,
  20: S20_TimeAllocation,
};

function MainContent() {
  const { currentSection } = useApp();
  const SectionComponent = SECTION_MAP[currentSection];

  if (!SectionComponent) return null;

  return <SectionComponent />;
}

export default function Home() {
  return (
    <AppLayout>
      <MainContent />
    </AppLayout>
  );
}
