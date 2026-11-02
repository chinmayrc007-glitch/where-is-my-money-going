import { Link } from "react-router-dom";


function Landing() {

    return (
        <div className="min-h-screen bg-[#f8f9fc] text-slate-900 overflow-hidden">


            {/* ========================================================= */}
            {/* NAVBAR */}
            {/* ========================================================= */}

            <nav className="fixed top-0 left-0 right-0 z-50">

                <div className="max-w-[1240px] mx-auto px-5 sm:px-8 pt-5">

                    <div className="h-[68px] rounded-2xl border border-white/10 bg-[#080d1c]/75 backdrop-blur-2xl shadow-[0_15px_50px_rgba(0,0,0,0.18)] flex items-center justify-between px-4 sm:px-6">


                        {/* BRAND */}

                        <Link
                            to="/"
                            className="flex items-center gap-3"
                        >

                            <div className="relative w-10 h-10 rounded-xl bg-white flex items-center justify-center">

                                <div className="absolute inset-[4px] rounded-[9px] bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center">

                                    <span className="text-white font-black">
                                        M
                                    </span>

                                </div>

                            </div>


                            <div>

                                <div className="text-[15px] font-extrabold text-white tracking-tight">
                                    MoneyTracker
                                </div>

                                <div className="hidden sm:block text-[8px] text-slate-500 uppercase tracking-[0.2em] font-bold">
                                    Financial intelligence
                                </div>

                            </div>

                        </Link>


                        {/* NAV */}

                        <div className="hidden md:flex items-center gap-8">

                            <a
                                href="#features"
                                className="text-xs font-semibold text-slate-400 hover:text-white transition"
                            >
                                Features
                            </a>

                            <a
                                href="#how"
                                className="text-xs font-semibold text-slate-400 hover:text-white transition"
                            >
                                How it works
                            </a>

                            <a
                                href="#ai"
                                className="text-xs font-semibold text-slate-400 hover:text-white transition"
                            >
                                Intelligence
                            </a>

                        </div>


                        {/* ACTION */}

                        <div className="flex items-center gap-2">

                            <Link
                                to="/login"
                                className="hidden sm:flex h-10 px-4 items-center rounded-xl text-xs font-bold text-slate-300 hover:text-white transition"
                            >
                                Sign in
                            </Link>

                            <Link
                                to="/register"
                                className="h-10 px-5 flex items-center rounded-xl bg-white text-slate-950 text-xs font-extrabold hover:bg-slate-100 transition"
                            >
                                Get started
                            </Link>

                        </div>

                    </div>

                </div>

            </nav>


            {/* ========================================================= */}
            {/* HERO */}
            {/* ========================================================= */}

            <section className="relative min-h-[900px] bg-[#060a15] overflow-hidden">


                {/* BACKGROUND */}

                <div className="absolute inset-0">


                    {/* MAIN GLOW */}

                    <div
                        className="
                            absolute
                            top-[-250px]
                            left-1/2
                            -translate-x-1/2
                            w-[850px]
                            h-[700px]
                            rounded-full
                            bg-indigo-600/20
                            blur-[140px]
                        "
                    />


                    {/* BLUE GLOW */}

                    <div
                        className="
                            absolute
                            top-[350px]
                            -left-[250px]
                            w-[600px]
                            h-[600px]
                            rounded-full
                            bg-blue-600/10
                            blur-[130px]
                        "
                    />


                    {/* PURPLE GLOW */}

                    <div
                        className="
                            absolute
                            top-[300px]
                            -right-[300px]
                            w-[650px]
                            h-[650px]
                            rounded-full
                            bg-violet-600/10
                            blur-[140px]
                        "
                    />


                    {/* GRID */}

                    <div
                        className="absolute inset-0 opacity-[0.18]"
                        style={{
                            backgroundImage: `
                                linear-gradient(
                                    rgba(148,163,184,0.12) 1px,
                                    transparent 1px
                                ),
                                linear-gradient(
                                    90deg,
                                    rgba(148,163,184,0.12) 1px,
                                    transparent 1px
                                )
                            `,
                            backgroundSize: "70px 70px"
                        }}
                    />


                    {/* VIGNETTE */}

                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_25%,#060a15_85%)]" />

                </div>


                {/* ===================================================== */}
                {/* DECORATIVE DATA */}
                {/* ===================================================== */}

                <div className="absolute inset-0 pointer-events-none">


                    {/* graph */}

                    <svg
                        className="absolute left-1/2 top-[420px] -translate-x-1/2 w-[1100px] h-[400px] opacity-40"
                        viewBox="0 0 1100 400"
                        preserveAspectRatio="none"
                    >

                        <defs>

                            <linearGradient
                                id="heroGraph"
                                x1="0"
                                y1="0"
                                x2="1"
                                y2="0"
                            >

                                <stop
                                    offset="0%"
                                    stopColor="#4f46e5"
                                    stopOpacity="0"
                                />

                                <stop
                                    offset="35%"
                                    stopColor="#6366f1"
                                />

                                <stop
                                    offset="70%"
                                    stopColor="#38bdf8"
                                />

                                <stop
                                    offset="100%"
                                    stopColor="#6366f1"
                                    stopOpacity="0"
                                />

                            </linearGradient>


                            <linearGradient
                                id="heroFill"
                                x1="0"
                                y1="0"
                                x2="0"
                                y2="1"
                            >

                                <stop
                                    offset="0%"
                                    stopColor="#6366f1"
                                    stopOpacity="0.18"
                                />

                                <stop
                                    offset="100%"
                                    stopColor="#6366f1"
                                    stopOpacity="0"
                                />

                            </linearGradient>

                        </defs>


                        <path
                            d="
                                M0 310
                                C90 300 120 260 200 280
                                C280 300 300 230 370 250
                                C450 270 480 150 550 190
                                C620 230 650 125 720 155
                                C790 185 820 90 890 120
                                C960 150 1000 55 1100 70
                                L1100 400
                                L0 400
                                Z
                            "
                            fill="url(#heroFill)"
                        />


                        <path
                            d="
                                M0 310
                                C90 300 120 260 200 280
                                C280 300 300 230 370 250
                                C450 270 480 150 550 190
                                C620 230 650 125 720 155
                                C790 185 820 90 890 120
                                C960 150 1000 55 1100 70
                            "
                            fill="none"
                            stroke="url(#heroGraph)"
                            strokeWidth="3"
                        />

                    </svg>


                    {/* DATA DOTS */}

                    <div className="absolute top-[550px] left-[25%] w-2 h-2 rounded-full bg-indigo-400 shadow-[0_0_25px_8px_rgba(99,102,241,0.3)]" />

                    <div className="absolute top-[480px] left-[50%] w-2 h-2 rounded-full bg-blue-400 shadow-[0_0_25px_8px_rgba(59,130,246,0.3)]" />

                    <div className="absolute top-[430px] right-[25%] w-2 h-2 rounded-full bg-violet-400 shadow-[0_0_25px_8px_rgba(139,92,246,0.3)]" />

                </div>


                {/* ===================================================== */}
                {/* HERO CONTENT */}
                {/* ===================================================== */}

                <div className="relative z-10 max-w-[1050px] mx-auto px-5 sm:px-8 pt-[190px] text-center">


                    {/* BADGE */}

                    <div className="inline-flex items-center gap-2 rounded-full border border-indigo-400/20 bg-indigo-500/10 px-4 py-2 text-[10px] sm:text-[11px] font-bold text-indigo-300 backdrop-blur-xl">

                        <span className="relative flex w-2 h-2">

                            <span className="absolute inset-0 rounded-full bg-indigo-400 animate-ping opacity-50" />

                            <span className="relative w-2 h-2 rounded-full bg-indigo-400" />

                        </span>

                        A smarter way to manage your money

                        <span className="text-indigo-500">
                            →
                        </span>

                    </div>


                    {/* HEADLINE */}

                    <h1 className="mt-8 text-[48px] leading-[0.98] sm:text-[72px] md:text-[88px] font-black tracking-[-0.065em] text-white">

                        Your money.

                        <span className="block">

                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-blue-400 to-cyan-300">
                                Your clarity.
                            </span>

                        </span>

                    </h1>


                    {/* DESCRIPTION */}

                    <p className="max-w-[620px] mx-auto mt-7 text-sm sm:text-base leading-7 text-slate-400">

                        MoneyTracker turns your everyday transactions into a clear picture of your financial life — helping you track, understand and improve your spending.

                    </p>


                    {/* BUTTONS */}

                    <div className="flex flex-col sm:flex-row justify-center gap-3 mt-9">

                        <Link
                            to="/register"
                            className="
                                h-12
                                px-7
                                rounded-xl
                                bg-white
                                text-slate-950
                                flex
                                items-center
                                justify-center
                                text-sm
                                font-extrabold
                                hover:bg-slate-100
                                transition
                                shadow-[0_15px_50px_rgba(255,255,255,0.12)]
                            "
                        >
                            Start tracking for free

                            <span className="ml-2 text-indigo-600">
                                →
                            </span>

                        </Link>


                        <a
                            href="#features"
                            className="
                                h-12
                                px-7
                                rounded-xl
                                border
                                border-white/10
                                bg-white/[0.04]
                                backdrop-blur-xl
                                text-white
                                flex
                                items-center
                                justify-center
                                text-sm
                                font-bold
                                hover:bg-white/[0.08]
                                transition
                            "
                        >
                            Explore features
                        </a>

                    </div>


                    {/* TRUST */}

                    <div className="mt-7 flex justify-center flex-wrap gap-x-7 gap-y-2 text-[10px] text-slate-500 font-semibold">

                        <span>
                            ✓ Personal financial dashboard
                        </span>

                        <span>
                            ✓ Detailed analytics
                        </span>

                        <span>
                            ✓ AI intelligence roadmap
                        </span>

                    </div>

                </div>


                {/* ===================================================== */}
                {/* FLOATING CARDS */}
                {/* ===================================================== */}


                {/* BALANCE */}

                <div className="hidden lg:block absolute left-[8%] top-[540px] z-20">

                    <FloatingCard
                        title="Current balance"
                        value="₹42,850"
                        subtitle="+12.8% this month"
                        positive
                    />

                </div>


                {/* SPENDING */}

                <div className="hidden lg:block absolute right-[7%] top-[590px] z-20">

                    <FloatingCard
                        title="Monthly spending"
                        value="₹15,150"
                        subtitle="18% lower than average"
                        positive
                    />

                </div>


                {/* SAVINGS */}

                <div className="hidden lg:block absolute left-[17%] top-[720px] z-20">

                    <div className="w-[175px] rounded-2xl border border-white/10 bg-white/[0.06] backdrop-blur-xl p-4 shadow-[0_20px_50px_rgba(0,0,0,0.25)]">

                        <div className="text-[9px] font-bold uppercase tracking-wider text-slate-500">
                            Savings rate
                        </div>

                        <div className="mt-2 text-2xl font-black text-white">
                            73.7%
                        </div>

                        <div className="mt-3 h-1.5 rounded-full bg-white/10 overflow-hidden">

                            <div className="h-full w-[74%] rounded-full bg-gradient-to-r from-indigo-500 to-cyan-400" />

                        </div>

                    </div>

                </div>


            </section>


            {/* ========================================================= */}
            {/* PRODUCT INTRO */}
            {/* ========================================================= */}

            <section className="relative py-24 sm:py-32 bg-white">


                {/* subtle glow */}

                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-indigo-100/40 blur-[100px] rounded-full pointer-events-none" />


                <div className="relative max-w-[1100px] mx-auto px-6 text-center">


                    <div className="text-[10px] uppercase tracking-[0.2em] font-black text-indigo-600">
                        One financial workspace
                    </div>


                    <h2 className="mt-4 text-3xl sm:text-5xl font-black tracking-[-0.045em] text-slate-950">

                        Everything you need to

                        <span className="block text-indigo-600">
                            understand your money.
                        </span>

                    </h2>


                    <p className="max-w-[650px] mx-auto mt-5 text-sm leading-7 text-slate-500">
                        Stop guessing where your money went. MoneyTracker gives you the tools to see the complete picture.
                    </p>


                    {/* FEATURE GRID */}

                    <div
                        id="features"
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-14 text-left"
                    >

                        <FeatureCard
                            number="01"
                            icon="↔"
                            title="Track everything"
                            text="Record income and expenses and keep your financial history organized."
                        />

                        <FeatureCard
                            number="02"
                            icon="◒"
                            title="See the patterns"
                            text="Understand where your money goes through powerful analytics."
                        />

                        <FeatureCard
                            number="03"
                            icon="◎"
                            title="Set better budgets"
                            text="Create monthly budgets and know exactly how much you have left."
                        />

                        <FeatureCard
                            number="04"
                            icon="↻"
                            title="Stay ahead"
                            text="Manage subscriptions, bills and recurring financial commitments."
                        />

                        <FeatureCard
                            number="05"
                            icon="◔"
                            title="Know your health"
                            text="Get a simple picture of your savings and overall financial position."
                        />

                        <FeatureCard
                            number="06"
                            icon="✦"
                            title="Add intelligence"
                            text="The future intelligence layer will turn your financial data into actionable insights."
                            highlighted
                        />

                    </div>

                </div>

            </section>


            {/* ========================================================= */}
            {/* HOW IT WORKS */}
            {/* ========================================================= */}

            <section
                id="how"
                className="relative py-24 sm:py-32 bg-[#f5f7fb] overflow-hidden"
            >

                <div className="absolute top-[-200px] right-[-200px] w-[500px] h-[500px] rounded-full bg-indigo-100/50 blur-[120px]" />


                <div className="relative max-w-[1100px] mx-auto px-6">


                    <div className="max-w-[650px]">

                        <div className="text-[10px] uppercase tracking-[0.2em] font-black text-indigo-600">
                            How it works
                        </div>

                        <h2 className="mt-4 text-3xl sm:text-5xl font-black tracking-[-0.045em] text-slate-950">

                            From messy transactions

                            <span className="block text-indigo-600">
                                to financial clarity.
                            </span>

                        </h2>

                    </div>


                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-14">

                        <StepCard
                            number="01"
                            title="Track"
                            text="Add your income and expenses. Everything stays organized in one place."
                        />

                        <StepCard
                            number="02"
                            title="Understand"
                            text="Use analytics to see trends, categories, spending and savings."
                        />

                        <StepCard
                            number="03"
                            title="Improve"
                            text="Use the information to budget better and make smarter financial decisions."
                        />

                    </div>

                </div>

            </section>


            {/* ========================================================= */}
            {/* AI SECTION */}
            {/* ========================================================= */}

            <section
                id="ai"
                className="relative py-24 sm:py-32 bg-[#060a15] overflow-hidden"
            >


                {/* GLOWS */}

                <div className="absolute top-[-250px] right-[-100px] w-[600px] h-[600px] rounded-full bg-indigo-600/15 blur-[130px]" />

                <div className="absolute bottom-[-300px] left-[-100px] w-[500px] h-[500px] rounded-full bg-blue-600/10 blur-[120px]" />


                <div className="relative max-w-[1100px] mx-auto px-6">


                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">


                        {/* COPY */}

                        <div>

                            <div className="inline-flex items-center gap-2 rounded-full border border-indigo-400/20 bg-indigo-500/10 px-3 py-1.5 text-[9px] uppercase tracking-[0.18em] font-black text-indigo-300">

                                <span>
                                    ✦
                                </span>

                                Coming next

                            </div>


                            <h2 className="mt-6 text-4xl sm:text-5xl font-black tracking-[-0.045em] text-white leading-tight">

                                Your financial data.

                                <span className="block text-indigo-400">
                                    An intelligent layer.
                                </span>

                            </h2>


                            <p className="mt-6 text-sm leading-7 text-slate-400 max-w-[520px]">

                                MoneyTracker is being designed to go beyond dashboards. The future AI layer will understand your financial data and help you ask questions, discover patterns and make better decisions.

                            </p>


                            <div className="grid grid-cols-2 gap-3 mt-8">

                                <AIItem text="Natural language queries" />

                                <AIItem text="Spending insights" />

                                <AIItem text="Budget recommendations" />

                                <AIItem text="Pattern detection" />

                            </div>

                        </div>


                        {/* AI WINDOW */}

                        <div className="relative">


                            {/* GLOW */}

                            <div className="absolute inset-[-40px] bg-indigo-600/10 blur-[80px]" />


                            <div className="relative rounded-[24px] border border-white/10 bg-white/[0.04] backdrop-blur-xl p-5 shadow-[0_30px_80px_rgba(0,0,0,0.35)]">


                                {/* HEADER */}

                                <div className="flex items-center gap-3 pb-4 border-b border-white/[0.07]">

                                    <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-blue-500 flex items-center justify-center text-white">
                                        ✦
                                    </div>

                                    <div>

                                        <div className="text-xs font-bold text-white">
                                            MoneyTracker Intelligence
                                        </div>

                                        <div className="text-[9px] text-slate-500">
                                            Financial assistant
                                        </div>

                                    </div>

                                    <div className="ml-auto">

                                        <span className="text-[8px] uppercase tracking-wider font-bold text-indigo-300 bg-indigo-500/10 border border-indigo-400/10 px-2 py-1 rounded-full">
                                            Preview
                                        </span>

                                    </div>

                                </div>


                                {/* CHAT */}

                                <div className="pt-6 space-y-4">


                                    <div className="ml-auto max-w-[78%] rounded-2xl rounded-tr-sm bg-indigo-500/15 border border-indigo-400/10 px-4 py-3">

                                        <p className="text-[10px] leading-5 text-indigo-100">
                                            Where did I spend the most this month?
                                        </p>

                                    </div>


                                    <div className="max-w-[90%] rounded-2xl rounded-tl-sm bg-white/[0.05] border border-white/[0.07] px-4 py-4">

                                        <p className="text-[10px] leading-5 text-slate-300">

                                            Your largest category is

                                            <span className="font-bold text-white">
                                                {" "}Food & Dining
                                            </span>

                                            . You spent approximately

                                            <span className="font-bold text-white">
                                                {" "}₹3,640
                                            </span>

                                            this month.

                                        </p>


                                        <div className="mt-4">

                                            <div className="flex justify-between text-[8px] text-slate-500 mb-2">

                                                <span>
                                                    Share of expenses
                                                </span>

                                                <span>
                                                    24%
                                                </span>

                                            </div>


                                            <div className="h-1.5 rounded-full bg-white/[0.06] overflow-hidden">

                                                <div className="h-full w-[64%] rounded-full bg-gradient-to-r from-indigo-500 to-blue-400" />

                                            </div>

                                        </div>

                                    </div>


                                    <div className="flex items-center gap-2 pt-1">

                                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />

                                        <span className="text-[8px] text-slate-500">
                                            Intelligence layer in development
                                        </span>

                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </section>


            {/* ========================================================= */}
            {/* FINAL CTA */}
            {/* ========================================================= */}

            <section className="relative py-28 sm:py-36 bg-white overflow-hidden">


                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full bg-indigo-100/50 blur-[110px]" />


                <div className="relative max-w-[750px] mx-auto px-6 text-center">


                    <div className="mx-auto w-14 h-14 rounded-2xl bg-slate-950 flex items-center justify-center text-white font-black shadow-[0_15px_40px_rgba(15,23,42,0.2)]">

                        <span className="text-lg">
                            M
                        </span>

                    </div>


                    <h2 className="mt-8 text-4xl sm:text-6xl font-black tracking-[-0.055em] text-slate-950">

                        Make your money

                        <span className="block text-indigo-600">
                            make sense.
                        </span>

                    </h2>


                    <p className="max-w-[540px] mx-auto mt-5 text-sm sm:text-base leading-7 text-slate-500">

                        Start tracking today and build a clearer picture of where your money goes.

                    </p>


                    <Link
                        to="/register"
                        className="
                            inline-flex
                            mt-9
                            h-12
                            px-7
                            items-center
                            rounded-xl
                            bg-slate-950
                            text-white
                            text-sm
                            font-extrabold
                            hover:bg-slate-800
                            transition
                            shadow-[0_15px_35px_rgba(15,23,42,0.18)]
                        "
                    >
                        Create your account

                        <span className="ml-2">
                            →
                        </span>

                    </Link>

                </div>

            </section>


            {/* ========================================================= */}
            {/* FOOTER */}
            {/* ========================================================= */}

            <footer className="border-t border-slate-200 bg-white">

                <div className="max-w-[1100px] mx-auto px-6 py-8 flex flex-col sm:flex-row justify-between items-center gap-3">

                    <div className="text-xs font-extrabold text-slate-800">
                        MoneyTracker
                    </div>

                    <div className="text-[10px] text-slate-400">
                        Personal Finance Intelligence · © 2026
                    </div>

                </div>

            </footer>

        </div>
    );
}


/* ========================================================= */
/* COMPONENTS */
/* ========================================================= */


function FloatingCard({
    title,
    value,
    subtitle,
    positive
}) {

    return (
        <div className="w-[190px] rounded-2xl border border-white/10 bg-white/[0.06] backdrop-blur-xl p-4 shadow-[0_25px_60px_rgba(0,0,0,0.25)]">

            <div className="text-[9px] uppercase tracking-wider font-bold text-slate-500">
                {title}
            </div>

            <div className="mt-2 text-2xl font-black text-white">
                {value}
            </div>

            <div
                className={`
                    mt-2
                    text-[9px]
                    font-semibold
                    ${
                        positive
                            ? "text-emerald-400"
                            : "text-slate-500"
                    }
                `}
            >
                {subtitle}
            </div>

        </div>
    );
}


function FeatureCard({
    number,
    icon,
    title,
    text,
    highlighted
}) {

    return (
        <div
            className={`
                group
                rounded-2xl
                p-6
                border
                transition-all
                duration-200
                hover:-translate-y-1
                hover:shadow-[0_20px_45px_rgba(15,23,42,0.08)]
                ${
                    highlighted
                        ? "bg-indigo-600 border-indigo-500 text-white"
                        : "bg-white border-slate-200"
                }
            `}
        >

            <div className="flex items-center justify-between">

                <div
                    className={`
                        w-10
                        h-10
                        rounded-xl
                        flex
                        items-center
                        justify-center
                        text-sm
                        font-bold
                        ${
                            highlighted
                                ? "bg-white/15 text-white"
                                : "bg-slate-100 text-slate-700 group-hover:bg-indigo-50 group-hover:text-indigo-600"
                        }
                    `}
                >
                    {icon}
                </div>

                <span
                    className={`
                        text-[9px]
                        font-black
                        tracking-widest
                        ${
                            highlighted
                                ? "text-indigo-200"
                                : "text-slate-300"
                        }
                    `}
                >
                    {number}
                </span>

            </div>


            <h3
                className={`
                    mt-6
                    text-sm
                    font-extrabold
                    ${
                        highlighted
                            ? "text-white"
                            : "text-slate-900"
                    }
                `}
            >
                {title}
            </h3>


            <p
                className={`
                    mt-2
                    text-xs
                    leading-6
                    ${
                        highlighted
                            ? "text-indigo-100"
                            : "text-slate-500"
                    }
                `}
            >
                {text}
            </p>

        </div>
    );
}


function StepCard({
    number,
    title,
    text
}) {

    return (
        <div className="relative rounded-2xl bg-white border border-slate-200 p-7 shadow-[0_10px_30px_rgba(15,23,42,0.03)]">

            <div className="text-[10px] font-black tracking-[0.2em] text-indigo-600">
                {number}
            </div>

            <h3 className="mt-8 text-xl font-black text-slate-950">
                {title}
            </h3>

            <p className="mt-3 text-sm leading-7 text-slate-500">
                {text}
            </p>

        </div>
    );
}


function AIItem({
    text
}) {

    return (
        <div className="flex items-center gap-2 rounded-xl border border-white/[0.07] bg-white/[0.035] px-3 py-3">

            <span className="w-5 h-5 rounded-md bg-indigo-500/10 text-indigo-300 flex items-center justify-center text-[9px]">
                ✦
            </span>

            <span className="text-[9px] font-semibold text-slate-400">
                {text}
            </span>

        </div>
    );
}


export default Landing;