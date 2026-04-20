import { useNavigate } from 'react-router-dom';

export default function AdvancedMode() {
  const navigate = useNavigate();

  return (
    <div className="bg-surface font-body text-on-surface overflow-x-hidden min-h-screen">
      {/* TopNavBar */}
      <nav className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-8 py-4 bg-blue-50/80 backdrop-blur-xl shadow-[0_12px_32px_rgba(44,47,49,0.06)] rounded-b-xl">
        <div className="flex items-center gap-4 cursor-pointer hover:opacity-80 transition-opacity" onClick={() => navigate('/standard')}>
          <div className="w-12 h-12 rounded-full bg-brand-blue flex items-center justify-center text-white shadow-lg overflow-hidden shrink-0">
            <span className="material-symbols-outlined text-3xl">face</span>
          </div>
          <div>
            <h1 className="font-headline font-extrabold text-2xl text-brand-blue tracking-tight">童语乐乐 物联网陪伴终端</h1>
            <p className="text-[11px] font-bold text-brand-blue/60 bg-brand-blue/10 px-3 py-0.5 rounded-full inline-block mt-1">唤醒词「乐乐」</p>
          </div>
        </div>
        <div className="hidden md:flex items-center bg-white/50 px-6 py-2 rounded-full gap-2">
          <span className="material-symbols-outlined text-primary text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>graphic_eq</span>
          <span className="text-on-surface-variant font-semibold text-sm">声纹已绑定 | 免唤醒对话开启</span>
        </div>
        <button className="flex items-center gap-2 bg-white px-5 py-2.5 rounded-full border border-surface-container-high bouncy-hover group">
          <span className="material-symbols-outlined text-error-container group-active:smoke-flash">detector_smoke</span>
          <span className="text-sm font-bold text-on-surface">烟雾检测</span>
          <span className="hidden sm:inline text-[10px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full font-bold ml-1">硬件传感器联动触发</span>
        </button>
      </nav>

      <main className="pt-28 pb-56 px-6 md:px-12 max-w-5xl mx-auto space-y-8">
        {/* Safety Card Section */}
        <section className="w-full">
          <div className="bg-surface-container-lowest p-6 rounded-xl flex items-center justify-between shadow-[0_8px_24px_rgba(44,47,49,0.04)]">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-tertiary-container flex items-center justify-center">
                <span className="material-symbols-outlined text-tertiary" style={{ fontVariationSettings: "'FILL' 1" }}>security</span>
              </div>
              <div>
                <h3 className="font-headline font-bold text-on-surface">环境安全正常</h3>
                <p className="text-sm text-on-surface-variant">24小时家庭安全监测中</p>
              </div>
            </div>
            <div className="flex gap-2">
              <span className="w-2 h-2 rounded-full bg-tertiary animate-pulse"></span>
              <span className="w-2 h-2 rounded-full bg-tertiary opacity-40"></span>
              <span className="w-2 h-2 rounded-full bg-tertiary opacity-20"></span>
            </div>
          </div>
        </section>

        {/* Chat Area */}
        <section className="space-y-6">
          {/* AI Message */}
          <div className="flex items-start gap-4 max-w-[85%]">
            <div className="w-10 h-10 rounded-full bg-white flex-shrink-0 flex items-center justify-center shadow-sm">
              <span className="material-symbols-outlined text-primary">face</span>
            </div>
            <div className="bg-tertiary-container text-on-tertiary-container px-6 py-4 rounded-xl rounded-tl-none shadow-sm">
              <p className="text-lg font-medium leading-relaxed">乐乐在这里！今天我们先来练习拼音，还是听一个有趣的睡前故事呢？</p>
            </div>
          </div>
          {/* User Message */}
          <div className="flex items-start gap-4 max-w-[85%] ml-auto flex-row-reverse">
            <div className="w-10 h-10 rounded-full bg-primary-fixed flex-shrink-0 flex items-center justify-center shadow-sm">
              <span className="material-symbols-outlined text-white">child_care</span>
            </div>
            <div className="bg-primary-container text-on-primary-container px-6 py-4 rounded-xl rounded-tr-none shadow-sm">
              <p className="text-lg font-medium leading-relaxed">我想学习数学，刚才那道算术题好难呀。</p>
            </div>
          </div>
        </section>

        {/* Scene Buttons: Bento Grid Layout */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
          {/* Homework */}
          <button className="bg-white p-8 rounded-xl flex flex-col items-center gap-4 text-center bouncy-hover shadow-[0_12px_32px_rgba(44,47,49,0.06)] border-b-8 border-blue-100">
            <div className="w-20 h-20 rounded-full bg-blue-50 flex items-center justify-center mb-2">
              <span className="material-symbols-outlined text-blue-600 text-[40px]">school</span>
            </div>
            <h4 className="font-headline font-bold text-xl text-on-surface">作业辅导</h4>
            <p className="text-sm text-slate-500 font-medium leading-relaxed">拼音 · 生字 · 数学<br />英语 · 古诗</p>
          </button>
          {/* Safety */}
          <button className="bg-white p-8 rounded-xl flex flex-col items-center gap-4 text-center bouncy-hover shadow-[0_12px_32px_rgba(44,47,49,0.06)] border-b-8 border-yellow-100">
            <div className="w-20 h-20 rounded-full bg-yellow-50 flex items-center justify-center mb-2">
              <span className="material-symbols-outlined text-secondary text-[40px]">security</span>
            </div>
            <h4 className="font-headline font-bold text-xl text-on-surface">安全科普</h4>
            <p className="text-sm text-slate-500 font-medium leading-relaxed">居家 · 出行 · 消防<br />陌生人安全</p>
          </button>
          {/* Feelings */}
          <button className="bg-white p-8 rounded-xl flex flex-col items-center gap-4 text-center bouncy-hover shadow-[0_12px_32px_rgba(44,47,49,0.06)] border-b-8 border-green-100">
            <div className="w-20 h-20 rounded-full bg-green-50 flex items-center justify-center mb-2">
              <span className="material-symbols-outlined text-tertiary text-[40px]">sentiment_satisfied</span>
            </div>
            <h4 className="font-headline font-bold text-xl text-on-surface">情感陪伴</h4>
            <p className="text-sm text-slate-500 font-medium leading-relaxed">情绪疏导 · 悄悄话<br />睡前聊天</p>
          </button>
        </section>
      </main>

      {/* Bottom Interaction Area */}
      <footer className="fixed bottom-0 left-0 w-full z-50 bg-white/95 backdrop-blur-3xl border-t border-slate-100/30 px-6 lg:px-12 pb-8 pt-6 shadow-[0_-12px_32px_rgba(44,47,49,0.03)]">
        <div className="w-full flex flex-col gap-6">
          {/* Interaction Row (Centered within full width) */}
          <div className="w-full max-w-4xl mx-auto flex items-center gap-4 md:gap-6">
            {/* Giant Mic Button */}
            <button className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-blue-500 to-blue-400 text-white flex items-center justify-center shadow-lg active:scale-95 transition-all mic-pulse flex-shrink-0">
              <span className="material-symbols-outlined text-[36px] md:text-[40px]" style={{ fontVariationSettings: "'FILL' 1" }}>mic</span>
            </button>
            {/* Text Input */}
            <div className="flex-grow flex items-center bg-slate-100/80 rounded-full px-6 md:px-8 py-4 md:py-5 group transition-all duration-300 focus-within:bg-white focus-within:ring-4 focus-within:ring-primary-fixed/30 border border-slate-200/50">
              <input 
                className="bg-transparent border-none focus:ring-0 w-full text-base md:text-lg font-medium placeholder-slate-400 outline-none text-slate-700" 
                placeholder="给乐乐发消息..." 
                type="text" 
              />
              <button className="ml-4 text-primary bouncy-hover">
                <span className="material-symbols-outlined text-[28px] md:text-[32px]" style={{ fontVariationSettings: "'FILL' 1" }}>send</span>
              </button>
            </div>
          </div>

          {/* Legal Footer & Controls (Desktop) - spans full width */}
          <div className="hidden md:flex justify-between items-end w-full">
            <div className="flex flex-col gap-3">
              <div className="bg-slate-100/80 p-1.5 rounded-full flex gap-1 w-fit shadow-inner">
                <button 
                  onClick={() => navigate('/standard')}
                  className="px-6 py-3 rounded-full font-black text-sm flex items-center gap-2 text-slate-400 hover:text-slate-600 transition-all"
                >
                  <span className="material-symbols-outlined text-lg">sentiment_satisfied</span>
                  切换到标准模式 (3-5岁)
                </button>
                <button 
                  className="px-6 py-3 rounded-full font-black text-sm flex items-center gap-2 bg-brand-blue text-white shadow-[0_4px_12px_rgba(0,174,239,0.2)] transition-all"
                >
                  <span className="material-symbols-outlined text-lg">auto_awesome</span>
                  切换到进阶模式 (6-8岁)
                </button>
              </div>
              <p className="text-[10px] font-bold text-slate-400 tracking-wider ml-4">
                音量≤85分贝 | 符合GB 6675-2014玩具安全标准 | 树莓派5B终端 | 环境安全感知 | 终端-云端双端联动
              </p>
            </div>
            
            <button 
              onClick={() => navigate('/parent')}
              className="bg-amber-500 text-white px-8 py-3.5 rounded-[2rem] font-black flex items-center gap-3 shadow-xl shadow-amber-500/20 hover:bg-amber-600 transition-all active:scale-95"
            >
              <span className="material-symbols-outlined text-xl">settings</span>
              <span>家长管理中心</span>
            </button>
          </div>
          
          {/* Mobile Legal Text */}
          <div className="text-center text-[11px] font-bold text-slate-400 tracking-wide md:hidden">
            音量限制85分贝 · 安全无广告<br/>树莓派5B终端 | 环境安全感知 | 终端-云端双端联动
          </div>
        </div>
      </footer>

      {/* BottomNavBar Contextual Injection (Homework active) */}
      <nav className="fixed bottom-0 left-0 w-full z-[60] md:hidden flex justify-around items-end px-6 pb-8 h-24 pointer-events-none">
        {/* Overlaying the interaction area on mobile for tab switching */}
        <div className="flex justify-around w-full pointer-events-auto">
          <div className="flex flex-col items-center justify-center bg-gradient-to-br from-blue-500 to-blue-400 text-white rounded-full p-4 scale-110 -translate-y-2 shadow-lg">
            <span className="material-symbols-outlined">school</span>
            <span className="font-['Be_Vietnam_Pro'] font-bold text-[10px]">Homework</span>
          </div>
          <div className="flex flex-col items-center justify-center text-slate-400 p-2">
            <span className="material-symbols-outlined">security</span>
            <span className="font-['Be_Vietnam_Pro'] font-bold text-[10px]">Safety</span>
          </div>
          <div className="flex flex-col items-center justify-center text-slate-400 p-2">
            <span className="material-symbols-outlined">sentiment_satisfied</span>
            <span className="font-['Be_Vietnam_Pro'] font-bold text-[10px]">Feelings</span>
          </div>
        </div>
      </nav>
    </div>
  );
}
