export default function Navbar() {
    const handleApplyClick = () => {
        window.location.hash = '#/register'
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    const handleAdminClick = () => {
        window.location.hash = '#/admin'
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    const NavLink = ({ href, children }) => (
        <a href={href} className="group relative text-sm text-slate-400 hover:text-white transition-colors duration-300 tracking-[0.4px]">
            {children}
            <span className="absolute -bottom-1 left-0 h-[1px] w-full scale-x-0 transform bg-fuchsia-500 transition-transform duration-300 group-hover:scale-x-100"></span>
        </a>
    );

    const AdminButton = ({ onClick, children }) => (
         <button onClick={onClick} className="group relative text-sm text-slate-400 hover:text-white transition-colors duration-300 tracking-[0.4px]">
            {children}
            <span className="absolute -bottom-1 left-0 h-[1px] w-full scale-x-0 transform bg-fuchsia-500 transition-transform duration-300 group-hover:scale-x-100"></span>
        </button>
    );

    return (
        <nav 
            style={{
                background: 'rgba(8, 8, 12, 0.85)',
                backdropFilter: 'blur(12px)',
            }}
            className="fixed top-0 w-full z-50 border-b border-white/5">
            <div className="max-w-7xl mx-auto px-[60px] h-[72px] flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <span className="text-xl font-bold font-display tracking-tight text-white">ChartSentinel</span>
                    <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-purple-500"></div>
                        <span className="text-xs font-medium tracking-widest text-slate-400 uppercase">
                            EARLY ACCESS
                        </span>
                    </div>
                </div>

                <div className="hidden md:flex items-center gap-8">
                    <NavLink href="#features">Features</NavLink>
                    <NavLink href="#pricing">Pricing</NavLink>
                    <NavLink href="#process">How It Works</NavLink>
                    <AdminButton onClick={handleAdminClick}>Admin</AdminButton>
                    
                    <div className="h-6 w-px bg-white/10"></div>

                    <button
                        onClick={handleApplyClick}
                        className="px-5 py-2.5 rounded-full bg-gradient-to-r from-fuchsia-500 to-purple-700 hover:shadow-[0_0_20px_rgba(217,70,239,0.35)] hover:-translate-y-px transition-all duration-300 text-white font-medium text-sm">
                        <span>Apply Now</span>
                    </button>
                </div>
            </div>
        </nav>
    )
}