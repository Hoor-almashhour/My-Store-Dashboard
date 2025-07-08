import type { ReactNode } from 'react';
import { toast } from 'react-toastify';


export const showSuccessToast = (message: string | ReactNode) => {
    toast.success(
        <div className="flex items-center gap-2">
            <svg className="w-5 h-5 " fill="none"  viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            <span>{message}</span>
        </div>
    );
};
export const showErrorToast = (message: string | ReactNode) => {
    toast.error(
        <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-red-600" fill="none"  viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
            <span>{message}</span>
        </div>
    );
};