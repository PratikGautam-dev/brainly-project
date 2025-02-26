import { Logo } from "../icons/Logo";

interface AuthLayoutProps {
    children: React.ReactNode;
    title: string;
    subtitle?: string;
}

export function AuthLayout({ children, title, subtitle }: AuthLayoutProps) {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4">
            <div className="bg-gray-800/50 backdrop-blur-lg border border-gray-700 rounded-xl shadow-2xl p-8 w-full max-w-md">
                <div className="flex justify-center mb-6">
                    <div className="text-purple-500">
                        <Logo />
                    </div>
                </div>
                <h1 className="text-2xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mb-2">{title}</h1>
                {subtitle && <p className="text-center text-gray-400 mb-6">{subtitle}</p>}
                {children}
            </div>
        </div>
    );
}
