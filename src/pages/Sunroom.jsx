import React from 'react';
import PageHead from '../components/PageHead';
import SunroomPageContents from '../components/SunroomPageContents';

export default function Sunroom() {
  return (
    <>
      <PageHead title="Sunroom Temp Dashboard" description="Sunroom Temp Dashboard" />
      <SunroomPageContents />
    </>
  );
}
