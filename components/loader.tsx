export function Loader() {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
            <div className="flex flex-col items-center">
                <div className="h-16 w-16 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
                <p className="mt-4 text-lg font-semibold">Transaction is in progress<br />Please wait...</p>
            </div>
        </div>
    )
}