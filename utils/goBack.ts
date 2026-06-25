import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'
import { getPreviousRoute } from '@/contexts/usePreviousRoute'

export function goBack(router: AppRouterInstance) {
    const prev = getPreviousRoute();
    if (prev) router.push(prev);
    else router.push('/');
}