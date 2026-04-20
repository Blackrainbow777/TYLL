import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Dashboard, 
  ChatHistory, 
  Alerts, 
  Reports, 
  DeviceManage, 
  ContentControl, 
  RemoteCompanion, 
  Settings 
} from './ParentSubPages';

type TabId = 'dashboard' | 'chat-history' | 'alerts' | 'reports' | 'device-manage' | 'content-control' | 'remote-companion' | 'settings';

export default function ParentDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabId>('dashboard');

  const menuItems: { id: TabId; label: string; icon: string }[] = [
    { id: 'dashboard', label: '主页看板', icon: 'grid_view' },
    { id: 'chat-history', label: '聊天记录', icon: 'history' },
    { id: 'alerts', label: '安全警报', icon: 'security' },
    { id: 'reports', label: '成长报告', icon: 'insights' },
    { id: 'device-manage', label: '设备与声纹管理', icon: 'devices' },
    { id: 'content-control', label: '内容与防沉迷管控', icon: 'vpn_key' },
    { id: 'remote-companion', label: '远程陪伴', icon: 'record_voice_over' },
    { id: 'settings', label: '系统设置', icon: 'settings' },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return <Dashboard onNavigateTo={(path: string) => setActiveTab(path as TabId)} />;
      case 'chat-history': return <ChatHistory />;
      case 'alerts': return <Alerts />;
      case 'reports': return <Reports />;
      case 'device-manage': return <DeviceManage />;
      case 'content-control': return <ContentControl />;
      case 'remote-companion': return <RemoteCompanion />;
      case 'settings': return <Settings />;
      default: return <Dashboard onNavigateTo={(path: string) => setActiveTab(path as TabId)} />;
    }
  };

  return (
    <div className="bg-slate-50 text-slate-800 min-h-screen">
      {/* Top Navigation Bar */}
      <header className="bg-white/80 backdrop-blur-xl border-b border-slate-100 sticky top-0 z-50 flex justify-between items-center px-6 py-4 w-full h-[72px]">
        <div className="flex items-center gap-4 cursor-pointer" onClick={() => navigate('/standard')}>
          <div className="w-8 h-8 bg-blue-600 rounded-xl flex items-center justify-center">
            <span className="material-symbols-outlined text-white text-lg">smart_toy</span>
          </div>
          <span className="text-xl font-bold tracking-tight text-slate-800">童语乐乐 物联网云端管控平台</span>
        </div>
        <div className="flex items-center gap-6">
          <div className="text-right hidden sm:block">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">欢迎回来，家长</p>
            <p className="text-sm font-bold text-slate-700">图图妈妈</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="relative p-2 rounded-xl hover:bg-slate-100 transition-colors text-slate-500">
              <span className="material-symbols-outlined">notifications</span>
              <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <button 
              onClick={() => navigate('/')}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-100/50 hover:bg-red-50 hover:text-red-600 transition-colors text-sm font-bold text-slate-600"
            >
              <span className="material-symbols-outlined text-[18px]">logout</span>
              <span>退出登录</span>
            </button>
          </div>
        </div>
      </header>

      <div className="flex h-[calc(100vh-72px)] overflow-hidden">
        {/* Side Navigation Bar */}
        <aside className="hidden md:flex flex-col w-[240px] bg-white border-r border-slate-100 py-6 overflow-y-auto">
          <nav className="flex-1 space-y-1 px-3">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  activeTab === item.id 
                    ? 'bg-blue-50 text-blue-600 font-bold' 
                    : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700 font-medium'
                }`}
              >
                <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: activeTab === item.id ? "'FILL' 1" : "'FILL' 0" }}>
                  {item.icon}
                </span>
                <span className="text-sm">{item.label}</span>
              </button>
            ))}
          </nav>
          <div className="px-5 mt-auto pt-6">
            <button 
              onClick={() => navigate('/advanced')} 
              className="w-full flex justify-center items-center gap-3 text-white bg-slate-800 hover:bg-slate-900 rounded-xl px-4 py-3.5 transition-colors shadow-lg shadow-slate-200"
            >
              <span className="material-symbols-outlined text-[18px]">forum</span>
              <span className="text-sm font-bold">回到对话界面</span>
            </button>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 p-6 md:p-10 overflow-y-auto">
           {renderContent()}
           <div className="mt-12 text-center text-[10px] font-bold text-slate-400 tracking-widest uppercase">
             树莓派5B终端 | 环境安全感知 | 终端-云端双端联动
           </div>
        </main>
      </div>

      {/* Mobile Bottom Navigation (Visible only on small screens) */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 pb-6 pt-3 bg-white/90 backdrop-blur-xl border-t border-slate-100 shadow-[0_-8px_30px_rgb(0,0,0,0.04)]">
        {menuItems.slice(0, 4).map((item) => (
          <button 
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`flex flex-col items-center justify-center p-2 ${
              activeTab === item.id ? 'text-blue-600' : 'text-slate-400'
            }`}
          >
            <span className="material-symbols-outlined mb-1" style={{ fontVariationSettings: activeTab === item.id ? "'FILL' 1" : "'FILL' 0" }}>
              {item.icon}
            </span>
            <span className="text-[10px] font-bold tracking-wider">{item.label.substring(0,2)}</span>
          </button>
        ))}
        {/* 'More' button for mobile to show other menus */}
        <button 
           onClick={() => setActiveTab('settings')}
           className={`flex flex-col items-center justify-center p-2 ${
              activeTab === 'settings' ? 'text-blue-600' : 'text-slate-400'
            }`}
        >
          <span className="material-symbols-outlined mb-1">more_horiz</span>
          <span className="text-[10px] font-bold tracking-wider">更多</span>
        </button>
      </nav>
    </div>
  );
}
