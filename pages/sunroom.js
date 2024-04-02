import dynamic from 'next/dynamic';

const SunroomPage = dynamic(() => import('../components/SunroomPageContents'))

export default SunroomPage;