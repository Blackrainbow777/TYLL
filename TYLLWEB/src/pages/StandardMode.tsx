import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function StandardMode() {
  const navigate = useNavigate();
  const [isAlarmActive, setIsAlarmActive] = useState(false);

  return (
    <div className="font-body text-slate-700 overflow-hidden h-screen flex flex-col bg-gradient-to-b from-[#f0f7ff] to-white">
      {/* Header */}
      <header className="w-full px-12 py-6 flex justify-between items-center z-50">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-brand-blue flex items-center justify-center text-white shadow-lg overflow-hidden">
            <span className="material-symbols-outlined text-3xl">face</span>
          </div>
          <div>
            <h1 className="font-headline font-extrabold text-2xl text-brand-blue tracking-tight">童语乐乐 物联网陪伴终端</h1>
            <p className="text-[11px] font-bold text-brand-blue/60 bg-brand-blue/10 px-3 py-0.5 rounded-full inline-block mt-1">唤醒词「乐乐」</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setIsAlarmActive(!isAlarmActive)}
            className={`flex items-center gap-2 bg-macaron-green text-green-700 px-5 py-2.5 rounded-full font-bold text-sm cursor-pointer hover:shadow-md transition-all active:scale-95 ${isAlarmActive ? 'alarm-active' : ''}`}
          >
            <span className="material-symbols-outlined text-xl">fire_extinguisher</span>
            <span>模拟烟雾报警</span>
          </button>
        </div>
      </header>

      {/* Main Canvas */}
      <main className="flex-1 overflow-hidden relative px-12">
        {/* Standard Mode (3-5 Years) */}
        <div className="w-full h-full flex flex-col items-center justify-center gap-12 text-center pb-20">
          <div className="relative">
            {/* Large Voice Feedback Circle */}
            <div className="w-80 h-80 rounded-full bg-brand-blue flex items-center justify-center animate-breathe-large cursor-pointer shadow-2xl z-10 relative">
              <span className="material-symbols-outlined text-white" style={{ fontSize: '160px', fontVariationSettings: "'FILL' 1" }}>mic</span>
            </div>
            {/* Pulse rings background */}
            <div className="absolute inset-0 w-80 h-80 rounded-full bg-brand-blue/20 scale-125 animate-ping opacity-20"></div>
          </div>
          <div className="space-y-6">
            <h2 className="font-headline font-black text-5xl text-slate-800 tracking-tight">按住说话 / 喊「乐乐」唤醒我</h2>
            <div className="inline-flex items-center gap-3 bg-white/80 border border-green-100 px-6 py-3 rounded-full shadow-sm">
              <span className="material-symbols-outlined text-green-500 font-bold">verified_user</span>
              <span className="text-green-800 font-black text-xl">仅小主人声纹可唤醒</span>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="px-12 py-8 flex justify-between items-end">
        <div className="flex flex-col gap-4">
          {/* Styled Mode Switch */}
          <div className="bg-slate-100/80 p-1.5 rounded-full flex gap-1 w-fit shadow-inner">
            <button 
              className="px-6 py-3 rounded-full font-black text-sm flex items-center gap-2 bg-brand-blue text-white shadow-[0_4px_12px_rgba(0,174,239,0.2)] transition-all"
            >
              <span className="material-symbols-outlined text-lg">sentiment_satisfied</span>
              切换到标准模式 (3-5岁)
            </button>
            <button 
              onClick={() => navigate('/advanced')}
              className="px-6 py-3 rounded-full font-black text-sm flex items-center gap-2 text-slate-400 hover:text-slate-600 transition-all"
            >
              <span className="material-symbols-outlined text-lg">auto_awesome</span>
              切换到进阶模式 (6-8岁)
            </button>
          </div>
          <p className="text-[10px] font-bold text-slate-300 tracking-wider">
            音量≤85分贝 | 符合GB 6675-2014玩具安全标准 | 树莓派5B终端 | 环境安全感知 | 终端-云端双端联动
          </p>
        </div>
        {/* Parent Center Button */}
        <button 
          onClick={() => navigate('/parent')}
          className="bg-amber-500 text-white px-8 py-4 rounded-[2rem] font-black flex items-center gap-3 shadow-xl shadow-amber-500/20 hover:bg-amber-600 transition-all active:scale-95"
        >
          <span className="material-symbols-outlined text-2xl">settings</span>
          <span>家长管理中心</span>
        </button>
      </footer>
    </div>
  );
}
