
'use client';

import dynamic from 'next/dynamic';
import React from 'react';

// This component is now just a wrapper that dynamically imports the client-side version.
const SplitTextClient = dynamic(() => import('./split-text-client'), {
  ssr: false,
  loading: () => <p>Loading...</p> // Optional: add a loading state
});

const SplitText = (props: React.ComponentProps<typeof SplitTextClient>) => {
  return <SplitTextClient {...props} />;
};

export default SplitText;
