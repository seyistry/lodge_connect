import { EllipsisHorizontalIcon } from '@heroicons/react/24/outline';

export default function Loading() {
  return (
    <div className="h-[100vh] w-full flex justify-center items-center bg-brand-100">
      <EllipsisHorizontalIcon className="text-brand-500 h-10 w-10 animate-spin" />
    </div>
  );
}
