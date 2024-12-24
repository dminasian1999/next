import DashboardSkeleton, {LatestInvoicesSkeleton} from '@/app/ui/skeletons';

export default function Loading() {
    return (
        <>
            <DashboardSkeleton />
            <LatestInvoicesSkeleton />
        </>
    );
}
