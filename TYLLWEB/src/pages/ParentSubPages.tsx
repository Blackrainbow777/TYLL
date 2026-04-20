import { useState } from 'react';

// 主页看板
function Dashboard({ onNavigateTo }: { onNavigateTo: (path: string) => void }) {
  const [showAchievementsInfo, setShowAchievementsInfo] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [showActivityDetail, setShowActivityDetail] = useState<{title: string; desc: string; extra: string} | null>(null);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const [activities, setActivities] = useState([
    { id: '1', type: 'chat', title: '聊天记录', desc: '对话：“探索太空与星辰”', extra: '时长：15 分钟 • 42 次交流', status: '已查看', time: '今天，10:45 AM' },
    { id: '2', type: 'alert', title: '安全警报', desc: '检测到异常话题', extra: 'AI 已引导孩子避开潜在的敏感内容', status: '待处理', time: '今天，09:12 AM' },
    { id: '3', type: 'report', title: '成长', desc: '每周词汇里程碑', extra: '新增：行星、轨道、大气、重力', status: '已归档', time: '昨天，04:30 PM' },
  ]);

  const handleLoadMore = () => {
    setIsLoadingMore(true);
    // 模拟网络请求
    setTimeout(() => {
      const moreActivities = [
        { id: Date.now().toString() + '1', type: 'chat', title: '聊天记录', desc: '故事会：“勇敢的小蚂蚁”', extra: '时长：22 分钟 • 孩子主导叙述', status: '已查看', time: '前天，11:20 AM' },
        { id: Date.now().toString() + '2', type: 'alert', title: '安全警报', desc: '连续使用超时', extra: '设备已连续工作超过 60 分钟', status: '已归档', time: '前天，02:15 PM' }
      ];
      setActivities(prev => [...prev, ...moreActivities]);
      setIsLoadingMore(false);
    }, 800);
  };

  return (
    <div className="animate-fade-in space-y-10">
      {/* 模块顶部：卡片数据 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 bg-gradient-to-br from-blue-500 to-blue-700 p-8 rounded-2xl text-white shadow-xl shadow-blue-500/20 flex flex-col justify-between relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-3xl font-extrabold mb-2 tracking-tight">关注孩子的成长</h2>
            <p className="text-blue-100 max-w-md font-medium leading-relaxed">您的 AI 伙伴今天进行了 12 次富有意义的对话，专注于提升情商和创造力。</p>
          </div>
          <div className="mt-8 flex gap-4 relative z-10">
            <button 
              onClick={() => onNavigateTo('reports')}
              className="bg-white text-blue-700 px-6 py-3 rounded-full font-bold text-sm shadow-lg hover:scale-105 active:scale-95 transition-all"
            >
              查看完整报告
            </button>
          </div>
          <div className="absolute -right-6 -bottom-10 opacity-20 transform rotate-12 pointer-events-none">
            <span className="material-symbols-outlined text-[180px]" style={{ fontVariationSettings: "'FILL' 1" }}>child_care</span>
          </div>
        </div>
        
        <div className="bg-amber-100/50 border border-amber-200/50 p-8 rounded-2xl flex flex-col justify-center items-center text-center relative">
          <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-amber-500 rounded-full flex items-center justify-center mb-4 shadow-lg shadow-amber-500/30">
            <span className="material-symbols-outlined text-white text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>workspace_premium</span>
          </div>
          <h3 className="text-xl font-bold text-amber-900">每日成就</h3>
          <p className="text-amber-800/80 text-sm mt-2 font-medium">孩子今天学会了 5 个新词汇！</p>
          <button 
            onClick={() => setShowAchievementsInfo(true)}
            className="mt-6 px-6 py-2.5 rounded-full bg-white text-amber-600 font-bold text-sm hover:bg-amber-50 transition-colors shadow-sm"
          >
            查看详情
          </button>
        </div>
      </div>

      {/* 模块底部：活动列表 */}
      <div className="bg-white rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.02)] border border-slate-100/50 overflow-hidden">
        <div className="p-6 flex flex-col sm:flex-row sm:justify-between sm:items-center border-b border-slate-50 gap-4">
          <div>
            <h3 className="text-lg font-bold text-slate-800">最近活动与警报</h3>
            <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mt-1">过去 24 小时的更新</p>
          </div>
          <div className="flex gap-3">
            <button 
              onClick={() => setShowFilterModal(true)}
              className="px-5 py-2.5 text-sm font-bold text-slate-600 bg-slate-50 hover:bg-slate-100 hover:text-blue-600 rounded-xl transition-all flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-sm">filter_list</span>
              筛选
            </button>
            <button 
              onClick={() => alert('导出成功！已将近期活动记录保存为 CSV 文件。')}
              className="px-5 py-2.5 text-sm font-bold text-slate-600 bg-slate-50 hover:bg-slate-100 hover:text-blue-600 rounded-xl transition-all flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-sm">download</span>
              导出 CSV
            </button>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest w-1/5">类型</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest w-2/5">活动详情</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest w-1/5">状态</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">时间</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest text-right">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {activities.map(act => (
                <tr key={act.id} className="hover:bg-slate-50/80 transition-colors group animate-fade-in">
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                        act.type === 'chat' ? 'bg-blue-50 text-blue-500' :
                        act.type === 'alert' ? 'bg-red-50 text-red-500' :
                        'bg-emerald-50 text-emerald-500'
                      }`}>
                        <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>
                          {act.type === 'chat' ? 'chat_bubble' : act.type === 'alert' ? 'warning' : 'insights'}
                        </span>
                      </div>
                      <span className="text-sm font-bold text-slate-700">{act.title}</span>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <p className={`text-sm font-bold ${act.type === 'alert' ? 'text-red-500' : 'text-slate-800'}`}>{act.desc}</p>
                    <p className="text-xs text-slate-400 font-medium mt-1">{act.extra}</p>
                  </td>
                  <td className="px-6 py-5">
                    <span className={`px-3 py-1.5 rounded-md text-[11px] font-bold tracking-wider inline-flex items-center gap-1.5 ${
                      act.status === '待处理' ? 'bg-red-50 text-red-600' :
                      act.status === '已查看' ? 'bg-slate-100 text-slate-600' :
                      'bg-emerald-50 text-emerald-600'
                    }`}>
                      {act.status === '待处理' && <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span>}
                      {act.status}
                    </span>
                  </td>
                  <td className="px-6 py-5">
                    <p className="text-xs font-semibold text-slate-500">{act.time}</p>
                  </td>
                  <td className="px-6 py-5 text-right">
                    <div className="flex justify-end gap-2">
                       <button onClick={() => setShowActivityDetail(act)} className="w-9 h-9 flex items-center justify-center rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors" title="查看详情">
                         <span className="material-symbols-outlined text-[20px]">visibility</span>
                       </button>
                       {act.type === 'alert' && (
                         <button onClick={() => onNavigateTo('alerts')} className="w-9 h-9 flex items-center justify-center rounded-lg text-red-400 hover:text-red-600 hover:bg-red-50 transition-colors" title="去处理">
                           <span className="material-symbols-outlined text-[20px]">priority_high</span>
                         </button>
                       )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-4 bg-slate-50/50 flex justify-center border-t border-slate-50">
          <button 
            disabled={isLoadingMore}
            onClick={handleLoadMore}
            className="text-sm font-bold text-slate-500 hover:text-blue-600 flex items-center gap-2 transition-colors py-2 px-6 rounded-lg hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoadingMore ? (
              <span className="material-symbols-outlined text-sm animate-spin">progress_activity</span>
            ) : (
              <span className="material-symbols-outlined text-sm">expand_more</span>
            )}
            {isLoadingMore ? '加载中...' : '加载历史活动'}
          </button>
        </div>
      </div>

      {/* 弹窗：成就详情 */}
      {showAchievementsInfo && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-md p-8 shadow-2xl animate-fade-in relative">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-slate-800">今日互动成果</h3>
              <button onClick={() => setShowAchievementsInfo(false)} className="text-slate-400 hover:text-slate-600">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            
            <div className="mb-6">
              <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-3">今日学习的词汇</h4>
              <ul className="grid grid-cols-2 gap-3 mb-6">
                {['行星', '轨道', '大气层', '引力', '黑洞'].map(word => (
                  <li key={word} className="flex items-center gap-2 bg-amber-50/50 p-3 rounded-xl border border-amber-100 text-sm">
                    <span className="w-6 h-6 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 font-bold text-xs">词</span>
                    <span className="font-bold text-slate-700">{word}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="mb-8">
               <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-3">详细互动记录</h4>
               <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-3">
                 <div className="flex gap-3">
                   <span className="material-symbols-outlined text-blue-500 text-[20px] mt-0.5" style={{ fontVariationSettings: "'FILL' 1" }}>chat_bubble</span>
                   <div>
                     <p className="text-sm font-bold text-slate-700">太空探索主题对话</p>
                     <p className="text-xs text-slate-500 mt-1 leading-relaxed">围绕“宇宙是如何形成的”发生了一次深入交流，孩子提出了很好的问题，并且学习了行星的概念。</p>
                   </div>
                 </div>
               </div>
            </div>

            <button onClick={() => setShowAchievementsInfo(false)} className="w-full py-3.5 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors">
              关闭详情
            </button>
          </div>
        </div>
      )}

      {/* 弹窗：活动记录详情 */}
      {showActivityDetail && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-md p-8 shadow-2xl animate-fade-in relative">
             <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-slate-800">活动记录详情</h3>
                <button onClick={() => setShowActivityDetail(null)} className="text-slate-400 hover:text-slate-600"><span className="material-symbols-outlined">close</span></button>
             </div>
             
             <div className="space-y-6 mb-8">
               <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">事件摘要</h4>
                  <p className="text-lg font-bold text-slate-800">{showActivityDetail.desc}</p>
               </div>
               <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">具体参数</h4>
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 text-sm font-medium text-slate-600">
                    {showActivityDetail.extra}
                  </div>
               </div>
               <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">平台评估分析</h4>
                  <div className="flex gap-3 items-start">
                     <span className="material-symbols-outlined text-blue-500 mt-0.5">info</span>
                     <p className="text-sm text-slate-600 leading-relaxed text-justify">
                       系统检测到本次 {showActivityDetail.title} 属于常规交互范畴。AI 已经妥善引导并回应了需求，暂不需要进行人工强烈干预，但推荐家长作为话题切入点与孩子互动。
                     </p>
                  </div>
               </div>
             </div>

             <button onClick={() => setShowActivityDetail(null)} className="w-full py-3.5 bg-slate-100 text-slate-700 hover:bg-slate-200 rounded-xl font-bold transition-colors">
               我知道了
             </button>
          </div>
        </div>
      )}

      {/* 弹窗：筛选 */}
      {showFilterModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-sm p-8 shadow-2xl animate-fade-in relative">
             <h3 className="text-xl font-bold text-slate-800 mb-6">筛选活动记录</h3>
             <div className="space-y-4 mb-8">
               <div>
                 <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 block">记录类型</label>
                 <select className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-700 outline-none focus:border-blue-500 active:bg-white transition-colors">
                    <option>全部类型</option>
                    <option>聊天记录</option>
                    <option>安全警报</option>
                    <option>成长报告</option>
                 </select>
               </div>
               <div>
                 <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 block">时间范围</label>
                 <select className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-700 outline-none focus:border-blue-500 active:bg-white transition-colors">
                    <option>过去 24 小时</option>
                    <option>过去 3 天</option>
                    <option>过去一周</option>
                    <option>自定义时间...</option>
                 </select>
               </div>
             </div>
             <div className="flex gap-4">
               <button onClick={() => setShowFilterModal(false)} className="flex-1 py-3.5 bg-slate-100 text-slate-600 rounded-xl font-bold hover:bg-slate-200 transition-colors">取消</button>
               <button onClick={() => setShowFilterModal(false)} className="flex-1 py-3.5 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200">应用筛选</button>
             </div>
          </div>
        </div>
      )}
    </div>
  );
}

// 占位其他页面
function ChatHistory() {
  const [searchQuery, setSearchQuery] = useState('');
  const [dateRange, setDateRange] = useState('7d');
  const [selectedSession, setSelectedSession] = useState<any | null>(null);
  const [bannedTopics, setBannedTopics] = useState<string[]>([]);
  const [isExporting, setIsExporting] = useState(false);

  // 模拟聊天会话记录数据
  const chatSessions = [
    {
      id: 'session-01',
      date: '2026-04-19',
      time: '14:20',
      theme: '探索太空与星辰',
      duration: '15 分钟',
      summary: '围绕“宇宙是如何形成的”发生了一次深入交流，孩子提出了很好的问题，并且学习了行星的概念。',
      messages: [
        { id: 'm1', sender: 'ai', text: '图图下午好呀！今天想听故事还是玩猜谜游戏呢？', time: '14:20' },
        { id: 'm2', sender: 'child', text: '我想听关于星星的故事！天上的星星是怎么来的？', time: '14:21' },
        { id: 'm3', sender: 'ai', text: '哇，这是一个超级棒的问题！其实呀，星星就像宇宙里的大火炉。很久很久以前，宇宙里有好多漂浮的尘埃和气体...', time: '14:21' },
        { id: 'm4', sender: 'child', text: '那它们会掉下来吗？', time: '14:23' },
        { id: 'm5', sender: 'ai', text: '不会哦！因为宇宙里有一种神奇的力量叫做“引力”，就像隐形的橡皮筋一样拉着它们。', time: '14:24' },
      ]
    },
    {
      id: 'session-02',
      date: '2026-04-18',
      time: '19:45',
      theme: '恐龙灭绝的秘密',
      duration: '22 分钟',
      summary: '睡前故事环节。孩子主动询问了恐龙相关知识，互动积极。',
      messages: [
        { id: 'm1', sender: 'child', text: '乐乐，霸王龙真的好厉害，为什么现在没有霸王龙了？', time: '19:45' },
        { id: 'm2', sender: 'ai', text: '是的呢，霸王龙是白垩纪的超级猎手。不过大约在6500万年前，发生了一件大事件...', time: '19:46' },
        { id: 'm3', sender: 'child', text: '是大陨石掉下来了吗？我在绘本上看到过。', time: '19:48' },
        { id: 'm4', sender: 'ai', text: '图图真聪明！没错，一颗巨大的小行星撞击了地球，导致天气变得好冷好冷，恐龙们找不到食物就慢慢消失了。', time: '19:49' },
      ]
    },
    {
      id: 'session-03',
      date: '2026-04-17',
      time: '16:10',
      theme: '幼儿园的社交困惑',
      duration: '8 分钟',
      summary: '孩子表现出微小的情绪波动，提及不愿意把玩具分享给其他小朋友。AI 进行了温和的情绪安抚。',
      messages: [
        { id: 'm1', sender: 'child', text: '我今天不开心。明明是我先拿到的积木，壮壮非要抢。', time: '16:10' },
        { id: 'm2', sender: 'ai', text: '听起来你觉得很委屈，积木被抢走一定很难过吧。那你当时是怎么处理的呢？', time: '16:11' },
        { id: 'm3', sender: 'child', text: '我告诉老师了，然后我不想理他了。我再也不想把玩具分给他玩。', time: '16:13' },
        { id: 'm4', sender: 'ai', text: '你告诉老师的做法非常对哦，学会保护自己是最棒的。分享也应该是你自愿的时候才开心呀。你想听一首开心的儿歌把烦恼赶走吗？', time: '16:15' },
      ]
    }
  ];

  // 按搜索条件和时间排序过滤数据
  const filteredSessions = chatSessions.filter(session => {
    return session.theme.includes(searchQuery) || session.summary.includes(searchQuery);
  });

  const handleExport = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      alert('导出成功！聊天记录已按所选时间范围打包为 CSV 文件。');
    }, 1000);
  };

  const handleBanTopic = (theme: string) => {
    if (bannedTopics.includes(theme)) {
      alert(`已将“${theme}”移出敏感词名单。`);
      setBannedTopics(prev => prev.filter(t => t !== theme));
    } else {
      setBannedTopics(prev => [...prev, theme]);
      alert(`已成功干预！未来 AI 将主动规避引导“${theme}”相关的周边话题，并收录入黑名单。`);
    }
  };

  return (
    <div className="animate-fade-in space-y-6 max-w-[1200px]">
      {/* 头部标题区 */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-800 tracking-tight">聊天记录看板</h2>
          <p className="text-slate-500 text-sm mt-1 font-medium">回顾孩子与 AI 伙伴的全部互动细节，掌握成长心路历程</p>
        </div>
      </div>

      {/* 顶部筛选控制栏 */}
      <div className="flex flex-col md:flex-row gap-4 bg-white p-4 rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.02)] border border-slate-100 items-center justify-between">
        <div className="flex flex-1 w-full md:w-auto gap-4">
          <div className="relative flex-1 max-w-md">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-[20px]">search</span>
            <input 
              type="text" 
              placeholder="搜索聊天主题或关键词..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:bg-white focus:border-blue-500 transition-colors font-medium text-slate-700"
            />
          </div>
          <div className="relative border-l border-slate-100 pl-4 hidden sm:block">
            <select 
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="py-2.5 px-4 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-600 outline-none focus:border-blue-500 cursor-pointer"
            >
              <option value="today">今天</option>
              <option value="7d">最近 7 天</option>
              <option value="30d">最近 30 天</option>
              <option value="all">全部历史记录</option>
            </select>
          </div>
        </div>
        
        <button 
          onClick={handleExport}
          className="w-full md:w-auto flex justify-center items-center gap-2 px-5 py-2.5 bg-slate-800 hover:bg-slate-900 border border-slate-800 text-white rounded-xl font-bold text-sm transition-all shadow-md shadow-slate-300"
          disabled={isExporting}
        >
          <span className={`material-symbols-outlined text-[18px] ${isExporting ? 'animate-bounce' : ''}`}>cloud_download</span>
          {isExporting ? '生成报表中...' : '一键导出记录'}
        </button>
      </div>

      {/* 列表区 */}
      <div className="bg-white rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.02)] border border-slate-100 overflow-hidden">
        {filteredSessions.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[700px]">
              <thead>
                <tr className="bg-slate-50/50">
                  <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest w-1/5">对话时间</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest w-2/5">交互主题分析</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest w-1/5">互动时长</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest text-right">操作</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100/60">
                {filteredSessions.map((session) => (
                  <tr key={session.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-6 py-5">
                      <p className="text-sm font-bold text-slate-700">{session.date}</p>
                      <p className="text-xs text-slate-400 font-medium mt-1">{session.time}</p>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2 mb-1">
                         <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                         <span className="text-sm font-bold text-slate-800">{session.theme}</span>
                         {bannedTopics.includes(session.theme) && (
                           <span className="ml-2 px-2 py-0.5 rounded text-[10px] font-bold bg-red-100 text-red-600">已限流</span>
                         )}
                      </div>
                      <p className="text-xs text-slate-500 font-medium line-clamp-1">{session.summary}</p>
                    </td>
                    <td className="px-6 py-5">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-bold bg-slate-100 text-slate-600">
                        <span className="material-symbols-outlined text-[14px]">schedule</span>
                        {session.duration}
                      </span>
                    </td>
                    <td className="px-6 py-5 text-right">
                      <button 
                        onClick={() => setSelectedSession(session)}
                        className="bg-blue-50 text-blue-600 hover:bg-blue-100 px-4 py-2 rounded-lg text-xs font-bold transition-colors inline-flex items-center gap-1 shadow-sm"
                      >
                        <span className="material-symbols-outlined text-[16px]">chat</span>
                        查看详情
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="py-24 flex flex-col items-center justify-center text-center">
             <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                <span className="material-symbols-outlined text-3xl text-slate-300">search_off</span>
             </div>
             <p className="text-slate-500 font-bold mb-1">没有找到相关的聊天记录</p>
             <p className="text-slate-400 text-sm">请尝试更换搜索关键词或筛选日期</p>
          </div>
        )}
      </div>

      {/* 弹窗：对话详细内容 */}
      {selectedSession && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-2xl shadow-2xl animate-fade-in flex flex-col h-[85vh] max-h-[800px]">
             
             {/* 模态框头部 */}
             <div className="flex justify-between items-center px-6 py-5 border-b border-slate-100">
                <div>
                   <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                     原声对话再现
                     <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-500 uppercase">
                       {selectedSession.date} {selectedSession.time}
                     </span>
                   </h3>
                   <p className="text-xs text-slate-500 font-medium mt-1">主题：{selectedSession.theme}</p>
                </div>
                <div className="flex items-center gap-2">
                   {/* 内容干预按钮 */}
                   <button 
                     onClick={() => handleBanTopic(selectedSession.theme)}
                     title={bannedTopics.includes(selectedSession.theme) ? "取消限制" : "限制该话题"}
                     className={`p-2 rounded-lg border transition-colors flex items-center gap-1 text-xs font-bold
                      ${bannedTopics.includes(selectedSession.theme) 
                        ? 'bg-red-50 text-red-600 border-red-200 hover:bg-red-100' 
                        : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'}`}
                   >
                     <span className="material-symbols-outlined text-[16px]">
                       {bannedTopics.includes(selectedSession.theme) ? 'do_not_disturb_off' : 'block'}
                     </span>
                     <span className="hidden sm:inline">
                       {bannedTopics.includes(selectedSession.theme) ? '解除话题限制' : '禁止同类话题'}
                     </span>
                   </button>
                   <button onClick={() => setSelectedSession(null)} className="w-9 h-9 flex items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 transition-colors">
                     <span className="material-symbols-outlined">close</span>
                   </button>
                </div>
             </div>
             
             {/* 聊天气泡列表 (滚动区) */}
             <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/50">
               {selectedSession.messages.map((msg: any) => (
                 <div key={msg.id} className={`flex ${msg.sender === 'child' ? 'justify-end' : 'justify-start'}`}>
                   <div className={`flex max-w-[85%] sm:max-w-[75%] gap-3 items-end ${msg.sender === 'child' ? 'flex-row-reverse' : 'flex-row'}`}>
                     
                     {/* 头像 */}
                     <div className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center shadow-sm 
                        ${msg.sender === 'child' ? 'bg-amber-100 text-amber-600' : 'bg-blue-600 text-white'}`}>
                        <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                          {msg.sender === 'child' ? 'face' : 'smart_toy'}
                        </span>
                     </div>
                     
                     {/* 气泡内容 */}
                     <div className={`relative px-4 py-3 shadow-sm text-sm group
                        ${msg.sender === 'child' 
                          ? 'bg-blue-500 text-white rounded-2xl rounded-br-sm' 
                          : 'bg-white border border-slate-100 text-slate-700 rounded-2xl rounded-bl-sm'}`}
                     >
                        <p className="leading-relaxed">{msg.text}</p>
                        <span className={`absolute top-full mt-1 text-[10px] font-bold opacity-0 group-hover:opacity-100 transition-opacity ${msg.sender === 'child' ? 'right-0 text-slate-400' : 'left-0 text-slate-400'}`}>
                          {msg.time}
                        </span>
                     </div>
                     
                   </div>
                 </div>
               ))}
             </div>

             {/* 模态框底部 */}
             <div className="px-6 py-4 border-t border-slate-100 bg-white rounded-b-3xl flex justify-between items-center">
                <p className="text-xs font-bold text-slate-400">总时长：<span className="text-slate-600">{selectedSession.duration}</span></p>
                <button onClick={() => setSelectedSession(null)} className="px-6 py-2.5 bg-slate-100 text-slate-600 hover:bg-slate-200 rounded-xl font-bold text-sm transition-colors">
                  我知道了
                </button>
             </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Alerts() {
  const [activeTab, setActiveTab] = useState<'smoke' | 'content'>('smoke');
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'processed'>('all');
  const [timeFilter, setTimeFilter] = useState('7d');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  
  type AlertData = { id: string; type: 'smoke' | 'content'; title: string; details: string; status: 'pending' | 'processed'; time: string; suggestion: string; };
  const [selectedAlert, setSelectedAlert] = useState<AlertData | null>(null);
  
  const [alertsData, setAlertsData] = useState<AlertData[]>([
    { id: '1', type: 'smoke', title: '烟雾浓度异常', details: '设备于客厅区域检测到大量烟雾，超出正常范围（检测值：450ppm）', status: 'pending', time: '今天，12:45 PM', suggestion: '请立即确认家中是否有明火未灭，并致电家人。如果确认起火请立即拨打119。' },
    { id: '2', type: 'smoke', title: '一氧化碳微量预警', details: '传感器检测到冬季供暖环境下存在微量一氧化碳', status: 'processed', time: '昨天，08:30 PM', suggestion: '建议开门窗通风，并彻底检查暖气设备及燃气阀门是否漏气。' },
    { id: '3', type: 'content', title: '具有危险性的话题尝试', details: '孩子在对话中多次询问“怎么偷偷玩火柴”，AI 已转移话题并封锁此类回答。', status: 'pending', time: '今天，09:12 AM', suggestion: '请在合适的时机向孩子科普消防安全教育，严肃强调火柴的危险性。' },
    { id: '4', type: 'content', title: '涉及消极情绪与负面词句', details: '孩子在睡前对话中提到“不想去幼儿园”，表现出沮丧情绪。', status: 'processed', time: '前天，04:20 PM', suggestion: '通过陪伴沟通了解孩子的幼儿园社交情况，必要时联系班主任老师。' }
  ]);

  const [pushConfig, setPushConfig] = useState({ wechat: true, sms: false, sensitivity: 'high' });

  const filteredAlerts = alertsData.filter(alert => {
    if (alert.type !== activeTab) return false;
    if (statusFilter !== 'all' && alert.status !== statusFilter) return false;
    return true;
  });

  const handleMarkProcessed = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setAlertsData(prev => prev.map(a => a.id === id ? { ...a, status: 'processed' } : a));
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 800);
  };

  const handleCallEmergency = () => {
    alert('⚠️ 正在为您优先拨打紧急联系人号码：138-XXXX-XXXX');
  };

  return (
    <div className="animate-fade-in space-y-6 max-w-[1200px]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-800 tracking-tight">安全警报中心</h2>
          <p className="text-slate-500 text-sm mt-1 font-medium">实时监控物理环境烟雾报警与 AI 对话内容安全风险</p>
        </div>
        <button 
          onClick={() => setShowSettingsModal(true)}
          className="flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-200 text-slate-700 hover:text-blue-600 hover:border-blue-200 hover:bg-blue-50 rounded-xl font-bold text-sm transition-all shadow-sm"
        >
          <span className="material-symbols-outlined text-[18px]">settings_alert</span>
          推送设置
        </button>
      </div>

      {/* Tabs */}
      <div className="flex bg-white p-1.5 rounded-xl shadow-[0_2px_12px_rgba(0,0,0,0.02)] border border-slate-100 w-fit">
        <button 
          onClick={() => { setActiveTab('smoke'); setStatusFilter('all'); }} 
          className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-bold transition-all ${
            activeTab === 'smoke' ? 'bg-blue-600 text-white shadow-md shadow-blue-200' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'
          }`}
        >
          <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: activeTab === 'smoke' ? "'FILL' 1" : "'FILL' 0" }}>detector_smoke</span>
          烟雾燃气报警
          <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium ml-1 hidden sm:inline ${activeTab === 'smoke' ? 'bg-blue-500 text-white' : 'bg-slate-100 text-slate-400'}`}>硬件传感器联动触发</span>
        </button>
        <button 
          onClick={() => { setActiveTab('content'); setStatusFilter('all'); }} 
          className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-bold transition-all ${
            activeTab === 'content' ? 'bg-amber-500 text-white shadow-md shadow-amber-200' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'
          }`}
        >
          <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: activeTab === 'content' ? "'FILL' 1" : "'FILL' 0" }}>gpp_bad</span>
          危险内容报警
        </button>
      </div>

      {/* Filter Area */}
      <div className="flex flex-wrap justify-between items-center gap-4 bg-white p-5 rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.02)] border border-slate-100">
        <div className="flex gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest hidden sm:block">处理状态</span>
            <select 
              value={statusFilter} 
              onChange={e => setStatusFilter(e.target.value as any)} 
              className="bg-slate-50 border border-slate-200 text-slate-700 text-sm rounded-xl focus:outline-none focus:border-blue-500 block px-4 py-2.5 font-bold cursor-pointer"
            >
               <option value="all">全部</option>
               <option value="pending">待处理</option>
               <option value="processed">已处理</option>
            </select>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest hidden sm:block">时间范围</span>
            <select 
              value={timeFilter} 
              onChange={e => setTimeFilter(e.target.value)} 
              className="bg-slate-50 border border-slate-200 text-slate-700 text-sm rounded-xl focus:outline-none focus:border-blue-500 block px-4 py-2.5 font-bold cursor-pointer"
            >
               <option value="24h">近 24 小时</option>
               <option value="7d">近 7 天</option>
               <option value="30d">近 30 天</option>
            </select>
          </div>
        </div>
        <button 
          onClick={handleRefresh} 
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 hover:text-blue-600 transition-colors"
        >
           <span className={`material-symbols-outlined text-[18px] ${isRefreshing ? 'animate-spin' : ''}`}>refresh</span>
           刷新
        </button>
      </div>

      {/* Alerts List */}
      <div className="bg-white rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.02)] border border-slate-100 overflow-hidden">
        {filteredAlerts.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead>
                <tr className="bg-slate-50/50">
                  <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest w-1/4">报警类型</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest w-1/3">简要详情</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest w-1/6">状态</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest w-1/6">时间</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest text-right">操作</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100/60">
                {filteredAlerts.map(alert => (
                  <tr key={alert.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                          alert.type === 'smoke' ? 'bg-red-50 text-red-500' : 'bg-amber-50 text-amber-500'
                        }`}>
                          <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>
                            {alert.type === 'smoke' ? 'local_fire_department' : 'warning'}
                          </span>
                        </div>
                        <span className="text-sm font-bold text-slate-700">{alert.title}</span>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <p className="text-sm font-medium text-slate-600 line-clamp-2">{alert.details}</p>
                    </td>
                    <td className="px-6 py-5">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[11px] font-bold tracking-wider uppercase border ${
                        alert.status === 'pending' 
                          ? 'bg-red-50 text-red-600 border-red-100' 
                          : 'bg-emerald-50 text-emerald-600 border-emerald-100'
                      }`}>
                        {alert.status === 'pending' && <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span>}
                        {alert.status === 'pending' ? '待处理' : '已归档'}
                      </span>
                    </td>
                    <td className="px-6 py-5">
                      <p className="text-xs font-semibold text-slate-500">{alert.time}</p>
                    </td>
                    <td className="px-6 py-5 text-right">
                      <div className="flex justify-end gap-2">
                        {alert.status === 'pending' && (
                          <button 
                            onClick={(e) => handleMarkProcessed(alert.id, e)} 
                            className="bg-emerald-50 text-emerald-600 hover:bg-emerald-100 px-3 py-2 rounded-lg text-xs font-bold transition-colors flex items-center gap-1"
                            title="标记为已处理"
                          >
                            <span className="material-symbols-outlined text-[14px]">check</span>
                            已处理
                          </button>
                        )}
                        <button 
                          onClick={() => setSelectedAlert(alert)} 
                          className="bg-slate-50 text-blue-600 hover:bg-blue-50 px-3 py-2 rounded-lg text-xs font-bold transition-colors flex items-center gap-1 border border-slate-100 hover:border-blue-100"
                        >
                          <span className="material-symbols-outlined text-[14px]">visibility</span>
                          详情
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="py-20 flex flex-col items-center justify-center text-center">
            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-4">
              <span className="material-symbols-outlined text-4xl text-slate-300">verified_user</span>
            </div>
            <p className="text-slate-500 font-bold mb-1">当前没有符合条件的报警记录</p>
            <p className="text-slate-400 text-sm">您的环境与设备状态非常安全</p>
          </div>
        )}
      </div>

      {/* 弹窗：安全报警详情 */}
      {selectedAlert && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-lg p-8 shadow-2xl animate-fade-in relative">
             <div className="flex justify-between items-start mb-6">
                <div>
                   <div className="flex items-center gap-2 mb-2">
                     <span className={`px-2 py-1 rounded text-[10px] font-bold tracking-widest ${selectedAlert.type === 'smoke' ? 'bg-red-100 text-red-600' : 'bg-amber-100 text-amber-600'}`}>
                       {selectedAlert.type === 'smoke' ? '物理环境预警' : '内容交互预警'}
                     </span>
                     <span className="text-xs font-medium text-slate-400">{selectedAlert.time}</span>
                   </div>
                   <h3 className="text-2xl font-bold text-slate-800">{selectedAlert.title}</h3>
                </div>
                <button onClick={() => setSelectedAlert(null)} className="text-slate-400 hover:text-slate-600">
                  <span className="material-symbols-outlined">close</span>
                </button>
             </div>
             
             <div className="space-y-6 mb-8">
               <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">报警详情日志</h4>
                  <p className="text-sm font-medium text-slate-700 leading-relaxed">{selectedAlert.details}</p>
               </div>
               
               <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px]">psychology</span> AI 分析与建议
                  </h4>
                  <p className="text-sm font-medium text-slate-600 leading-relaxed">
                    {selectedAlert.suggestion}
                  </p>
               </div>
             </div>

             {/* 紧急操作区 */}
             {selectedAlert.type === 'smoke' && selectedAlert.status === 'pending' && (
               <div className="bg-red-50 p-5 rounded-2xl border border-red-100 flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
                 <div>
                    <h4 className="text-red-700 font-bold text-sm">需要进行干预吗？</h4>
                    <p className="text-red-600/80 text-xs mt-1 font-medium">系统确认物理报警真实有效</p>
                 </div>
                 <button 
                   onClick={handleCallEmergency} 
                   className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-lg shadow-red-500/30 transition-all flex justify-center items-center gap-2"
                 >
                   <span className="material-symbols-outlined text-[18px]">emergency</span> 一键拨打紧急联系人
                 </button>
               </div>
             )}

             <div className="flex gap-4">
               {selectedAlert.status === 'pending' && (
                 <button 
                    onClick={(e) => { handleMarkProcessed(selectedAlert.id, e); setSelectedAlert(null); }} 
                    className="flex-1 py-3.5 bg-emerald-500 text-white rounded-xl font-bold hover:bg-emerald-600 transition-colors shadow-lg shadow-emerald-500/20"
                 >
                   标记为已处理
                 </button>
               )}
               <button 
                 onClick={() => setSelectedAlert(null)} 
                 className={`py-3.5 rounded-xl font-bold transition-colors ${selectedAlert.status === 'pending' ? 'flex-1 bg-slate-100 text-slate-600 hover:bg-slate-200' : 'w-full bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
               >
                 关闭详情
               </button>
             </div>
          </div>
        </div>
      )}

      {/* 弹窗：推送设置 */}
      {showSettingsModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-sm p-8 shadow-2xl animate-fade-in relative">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-slate-800">安全报警推送设置</h3>
              <button onClick={() => setShowSettingsModal(false)} className="text-slate-400 hover:text-slate-600">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            
            <div className="space-y-6 mb-8">
              <div>
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 block">传感器灵敏度</label>
                <div className="grid grid-cols-3 gap-2">
                  {['high', 'medium', 'low'].map(level => (
                    <button
                      key={level}
                      onClick={() => setPushConfig({...pushConfig, sensitivity: level})}
                      className={`py-2 rounded-lg text-sm font-bold border transition-colors ${
                        pushConfig.sensitivity === level 
                          ? 'bg-blue-50 border-blue-200 text-blue-600' 
                          : 'bg-white border-slate-200 text-slate-500 hover:bg-slate-50'
                      }`}
                    >
                      {level === 'high' ? '高(灵敏)' : level === 'medium' ? '中(标准)' : '低'}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="space-y-4">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1 block">通知渠道配置</label>
                
                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-green-500">forum</span>
                    <span className="text-sm font-bold text-slate-700">微信实时推送</span>
                  </div>
                  <button 
                    onClick={() => setPushConfig(prev => ({...prev, wechat: !prev.wechat}))}
                    className={`w-12 h-6 rounded-full transition-colors relative ${pushConfig.wechat ? 'bg-green-500' : 'bg-slate-300'}`}
                  >
                    <div className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-all ${pushConfig.wechat ? 'left-7' : 'left-1'}`}></div>
                  </button>
                </div>

                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-blue-500">sms</span>
                    <span className="text-sm font-bold text-slate-700">紧急短信通知</span>
                  </div>
                  <button 
                    onClick={() => setPushConfig(prev => ({...prev, sms: !prev.sms}))}
                    className={`w-12 h-6 rounded-full transition-colors relative ${pushConfig.sms ? 'bg-blue-500' : 'bg-slate-300'}`}
                  >
                    <div className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-all ${pushConfig.sms ? 'left-7' : 'left-1'}`}></div>
                  </button>
                </div>
              </div>
            </div>

            <button onClick={() => setShowSettingsModal(false)} className="w-full py-3.5 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200">
              保存配置
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function Reports() {
  const [timeFrame, setTimeFrame] = useState<'week' | 'month'>('week');
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      alert('成长报告 PDF 已生成并开始下载！');
    }, 1200);
  };

  const stats = timeFrame === 'week' ? {
    interactions: 78,
    studyHours: '12.5',
    safetyScore: 92
  } : {
    interactions: 312,
    studyHours: '56',
    safetyScore: 95
  };

  return (
    <div className="animate-fade-in space-y-6 max-w-[1200px]">
      <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-black text-slate-800 tracking-tight">AI 伙伴成长报告</h2>
          <p className="text-slate-500 text-sm mt-1 font-medium">了解孩子在交互中的能力发展与情绪认知</p>
        </div>
        <div className="flex items-center gap-3 bg-slate-50 p-1.5 rounded-xl border border-slate-200">
          <button onClick={() => setTimeFrame('week')} className={`px-4 py-1.5 rounded-lg text-sm font-bold transition-all ${timeFrame === 'week' ? 'bg-white shadow-sm text-blue-600' : 'text-slate-500 hover:text-slate-700'}`}>本周数据</button>
          <button onClick={() => setTimeFrame('month')} className={`px-4 py-1.5 rounded-lg text-sm font-bold transition-all ${timeFrame === 'month' ? 'bg-white shadow-sm text-blue-600' : 'text-slate-500 hover:text-slate-700'}`}>本月概览</button>
        </div>
      </div>

      {/* Data Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white p-6 rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.02)] border border-slate-100 flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-500 flex items-center justify-center"><span className="material-symbols-outlined text-[24px]">forum</span></div>
          <div>
            <h4 className="text-sm font-bold text-slate-500 mb-1">积极互动次数</h4>
            <p className="text-2xl font-black text-slate-800">{stats.interactions}<span className="text-sm font-medium text-slate-400 ml-1">次</span></p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.02)] border border-slate-100 flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-500 flex items-center justify-center"><span className="material-symbols-outlined text-[24px]">schedule</span></div>
          <div>
            <h4 className="text-sm font-bold text-slate-500 mb-1">有效学习时长</h4>
            <p className="text-2xl font-black text-slate-800">{stats.studyHours}<span className="text-sm font-medium text-slate-400 ml-1">小时</span></p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.02)] border border-slate-100 flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-500 flex items-center justify-center"><span className="material-symbols-outlined text-[24px]">health_and_safety</span></div>
          <div>
            <h4 className="text-sm font-bold text-slate-500 mb-1">安全知识掌握度</h4>
            <p className="text-2xl font-black text-slate-800">{stats.safetyScore}<span className="text-sm font-medium text-slate-400 ml-1">分</span></p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.02)] border border-slate-100 flex flex-col items-start">
           <div className="flex w-full justify-between items-center mb-6">
             <h3 className="text-xl font-bold text-slate-800">行为与心智分析总览</h3>
             <button onClick={handleExport} disabled={isExporting} className="flex items-center gap-2 bg-slate-800 text-white hover:bg-slate-900 px-4 py-2 rounded-xl text-sm font-bold transition-colors">
               <span className={`material-symbols-outlined text-[18px] ${isExporting ? 'animate-bounce' : ''}`}>download</span>
               {isExporting ? '正在生成...' : '下载完整PDF报告'}
             </button>
           </div>
           <div className="w-full bg-slate-50 border border-slate-100 rounded-xl p-6 flex flex-col justify-center items-center py-20 relative overflow-hidden">
             <span className="material-symbols-outlined text-6xl text-slate-200 mb-4 relative z-10">monitoring</span>
             <p className="text-slate-400 font-bold tracking-widest relative z-10">AI 数据大模型深度分析图表加载区</p>
             <div className="absolute w-full h-[150px] bottom-0 left-0 bg-gradient-to-t from-slate-100/50 to-transparent flex items-end justify-around px-8 opacity-50">
                <div className="w-12 bg-blue-200 rounded-t-sm transition-all duration-500" style={{ height: timeFrame === 'week' ? '40%' : '60%' }}></div>
                <div className="w-12 bg-blue-300 rounded-t-sm transition-all duration-500" style={{ height: timeFrame === 'week' ? '70%' : '85%' }}></div>
                <div className="w-12 bg-blue-400 rounded-t-sm transition-all duration-500" style={{ height: timeFrame === 'week' ? '55%' : '75%' }}></div>
                <div className="w-12 bg-blue-500 rounded-t-sm transition-all duration-500" style={{ height: timeFrame === 'week' ? '90%' : '98%' }}></div>
             </div>
           </div>
           <div className="mt-6 space-y-3">
             <h4 className="text-sm font-bold text-slate-700">AI 执行摘要：</h4>
             <p className="text-sm text-slate-600 leading-relaxed font-medium">在这段期间，您的孩子展现了极强的好奇心，特别是在自然科学与基础数学逻辑领域。AI 监测到对话涉及情绪波动的频率降低了15%，社交友善度显著提升。建议在下阶段加入更多的人文故事推送。</p>
           </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.02)] border border-slate-100 flex flex-col">
           <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
             <span className="material-symbols-outlined text-amber-500 text-[20px]">lightbulb</span>
             下阶段启蒙建议
           </h3>
           <div className="space-y-4">
             {[ 
               { id: 1, title: '《大自然的神奇天气》', type: '知识绘本', priority: '高' },
               { id: 2, title: '情绪控制与深呼吸教程', type: '行为习惯', priority: '中' },
               { id: 3, title: '少儿消防逃生模拟问答', type: '安全防护', priority: '极高' },
             ].map(item => (
               <div key={item.id} className="p-4 bg-slate-50 border border-slate-100 rounded-xl">
                 <div className="flex justify-between items-start mb-2">
                   <span className="text-sm font-bold text-slate-800">{item.title}</span>
                   <span className={`text-[10px] px-2 py-0.5 rounded font-bold ${item.priority === '极高' ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'}`}>{item.priority}</span>
                 </div>
                 <div className="flex justify-between items-center mt-3">
                   <span className="text-xs text-slate-400 font-medium uppercase tracking-widest">{item.type}</span>
                   <button onClick={() => alert(`已一键配置：${item.title}`)} className="text-xs font-bold text-blue-600 hover:text-blue-700 bg-white border border-slate-200 px-3 py-1 rounded-lg transition-colors">应用推荐</button>
                 </div>
               </div>
             ))}
           </div>
        </div>
      </div>
    </div>
  );
}

function DeviceManage() {
  // 1. 设备绑定状态
  const [deviceState, setDeviceState] = useState({ isBound: true, isOnline: true, battery: 82, name: '图图的专属乐乐熊', sn: 'LLX-2026-X9A4D' });
  
  // 2. 唤醒词状态
  const [wakeWord, setWakeWord] = useState('乐乐熊');
  const [isSavingWakeWord, setIsSavingWakeWord] = useState(false);

  // 3. 声纹认主状态
  const [isRecording, setIsRecording] = useState(false);
  const [recordProgress, setRecordProgress] = useState(0);
  const [voiceprintRegistered, setVoiceprintRegistered] = useState(false);

  // 4. 音色克隆状态
  const [cloneStatus, setCloneStatus] = useState<'idle' | 'uploading' | 'uploaded' | 'generating' | 'generated'>('idle');

  // 5. 安全与偏好设置状态
  const [volumeLimit, setVolumeLimit] = useState(85);
  const [freeWake, setFreeWake] = useState(false);

  // ===== 交互逻辑处理 =====

  const handleBindToggle = () => {
    if (deviceState.isBound) {
      if (window.confirm('解绑后设备将无法继续提供个性化 AI 陪伴，确认解绑吗？')) {
        setDeviceState(prev => ({ ...prev, isBound: false, isOnline: false, battery: 0, name: '未绑定设备', sn: 'N/A' }));
      }
    } else {
      alert('已模拟打开摄像头扫描设备底部二维码...');
      setTimeout(() => {
        setDeviceState({ isBound: true, isOnline: true, battery: 100, name: '新绑定的乐乐熊', sn: 'LLX-NEW-BIND' });
        alert('绑定成功！设备已接入网络。');
      }, 1000);
    }
  };

  const handleSaveWakeWord = () => {
    if (!wakeWord.trim()) {
      alert('唤醒词不能为空');
      return;
    }
    setIsSavingWakeWord(true);
    setTimeout(() => {
      setIsSavingWakeWord(false);
      alert(`自定义唤醒词“${wakeWord}”已成功保存并下发到设备！`);
    }, 800);
  };

  const handleStartRecording = () => {
    setIsRecording(true);
    setRecordProgress(0);
    let p = 0;
    const interval = setInterval(() => {
      p += 10;
      setRecordProgress(p);
      if (p >= 100) {
        clearInterval(interval);
        setIsRecording(false);
        setVoiceprintRegistered(true);
        alert('声纹录制完成！乐乐已记住主人的声音，后续将提供专属的验证和响应服务。');
      }
    }, 1000); // 每秒进度增加 10%，总共 10 秒
  };

  const handleUploadAudio = () => {
    setCloneStatus('uploading');
    setTimeout(() => setCloneStatus('uploaded'), 1500);
  };

  const handleGenerateClone = () => {
    setCloneStatus('generating');
    setTimeout(() => setCloneStatus('generated'), 2500); // 模拟 AI 分析和生成克隆音色模型时间
  };

  const handlePushClone = () => {
    alert('已成功将专属克隆音色下达到设备！孩子现在可以听到您的声音在讲故事啦。');
  };

  const handleSaveSettings = () => {
    alert('设备安全与偏好设置已成功保存！');
  };

  return (
    <div className="animate-fade-in space-y-6 max-w-[1200px]">
      {/* 头部标题区 */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-black text-slate-800 tracking-tight">设备与声纹管理</h2>
          <p className="text-slate-500 text-sm mt-1 font-medium">定制您的 AI 玩偶唤醒方式，使用 AI 音色克隆进行深度远程陪伴</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 左侧区域：设备状态 & 唤醒词 & 安全设置 */}
        <div className="space-y-6">
          
          {/* 设备绑定模块 */}
          <div className="bg-white rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.02)] border border-slate-100 p-6 flex flex-col relative overflow-hidden">
             <div className="flex justify-between items-start mb-6 relative z-10">
                <div className="flex items-center gap-4">
                   <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-inner ${deviceState.isBound ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-400'}`}>
                     <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>smart_toy</span>
                   </div>
                   <div>
                     <h3 className="text-lg font-bold text-slate-800">{deviceState.name}</h3>
                     <p className="text-xs text-slate-400 font-medium">SN: {deviceState.sn}</p>
                   </div>
                </div>
                <button 
                  onClick={handleBindToggle}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
                    deviceState.isBound 
                      ? 'bg-red-50 text-red-600 hover:bg-red-100' 
                      : 'bg-blue-600 text-white hover:bg-blue-700 shadow-md shadow-blue-200'
                  }`}
                >
                  {deviceState.isBound ? '解绑设备' : '扫码绑定'}
                </button>
             </div>
             
             <div className="grid grid-cols-2 gap-3 relative z-10">
               <div className="bg-slate-50/80 p-4 rounded-xl border border-slate-100 flex items-center gap-3">
                 <div className={`w-2.5 h-2.5 rounded-full ${deviceState.isOnline ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)] animate-pulse' : 'bg-slate-300'}`}></div>
                 <div>
                   <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">网络状态</p>
                   <p className="text-sm font-bold text-slate-700">{deviceState.isOnline ? '设备在线 (WiFi)' : '设备离线'}</p>
                 </div>
               </div>
               <div className="bg-slate-50/80 p-4 rounded-xl border border-slate-100 flex items-center gap-3">
                 <span className={`material-symbols-outlined ${deviceState.isBound && deviceState.battery > 20 ? 'text-emerald-500' : 'text-slate-400'}`}>
                   {deviceState.isBound ? (deviceState.battery > 80 ? 'battery_full' : 'battery_5_bar') : 'battery_0_bar'}
                 </span>
                 <div>
                   <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">当前电量</p>
                   <p className="text-sm font-bold text-slate-700">{deviceState.isBound ? `${deviceState.battery}% (运行良好)` : '--'}</p>
                 </div>
               </div>
             </div>
             {/* 装饰水印背景 */}
             <div className="absolute -right-8 -bottom-8 opacity-[0.03] pointer-events-none transform rotate-[-15deg]">
               <span className="material-symbols-outlined text-[150px]" style={{ fontVariationSettings: "'FILL' 1" }}>router</span>
             </div>
          </div>

          {/* 唤醒词设置模块 */}
          <div className="bg-white rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.02)] border border-slate-100 p-6">
             <div className="flex items-center gap-2 mb-4">
               <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center">
                 <span className="material-symbols-outlined text-blue-500 text-[18px]">record_voice_over</span>
               </div>
               <h3 className="text-lg font-bold text-slate-800">自定义唤醒词</h3>
             </div>
             <p className="text-xs text-slate-500 font-medium mb-4 leading-relaxed">
               为您的玩偶设置一个专属的称呼，孩子需要喊出这个词才能唤醒 AI 对话功能。建议使用 3-5 个音节的词语。
             </p>
             <div className="flex flex-col sm:flex-row gap-3">
               <input 
                 type="text" 
                 value={wakeWord}
                 onChange={(e) => setWakeWord(e.target.value)}
                 placeholder="例如: 亲爱的乐乐"
                 className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white transition-colors"
                 disabled={!deviceState.isBound}
               />
               <button 
                 onClick={handleSaveWakeWord}
                 disabled={!deviceState.isBound || isSavingWakeWord}
                 className="flex items-center justify-center gap-2 bg-slate-800 text-white hover:bg-slate-900 px-6 py-3 rounded-xl font-bold text-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md shadow-slate-200"
               >
                 {isSavingWakeWord ? <span className="material-symbols-outlined animate-spin text-[18px]">sync</span> : <span className="material-symbols-outlined text-[18px]">save</span>}
                 {isSavingWakeWord ? '下发中...' : '保存并下发'}
               </button>
             </div>
          </div>

          {/* 安全偏好设置模块 */}
          <div className="bg-white rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.02)] border border-slate-100 p-6">
             <div className="flex items-center gap-2 mb-6">
               <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center">
                 <span className="material-symbols-outlined text-emerald-500 text-[18px]">admin_panel_settings</span>
               </div>
               <h3 className="text-lg font-bold text-slate-800">声音与安全偏好</h3>
             </div>
             
             <div className="space-y-6">
               {/* 听力保护 (音量限制) */}
               <div>
                  <div className="flex justify-between items-end mb-3">
                    <label className="text-sm font-bold text-slate-700 block">听力保护最高音量限制</label>
                    <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-md">{volumeLimit} dB</span>
                  </div>
                  <input 
                    type="range" 
                    min="30" max="100" 
                    value={volumeLimit} 
                    onChange={(e) => setVolumeLimit(Number(e.target.value))}
                    className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                    disabled={!deviceState.isBound}
                  />
                  <div className="flex justify-between text-[10px] font-bold text-slate-400 mt-2">
                    <span>30dB (轻声)</span>
                    <span>100dB (极响)</span>
                  </div>
               </div>

               {/* 免唤醒对话 */}
               <div className="flex items-center justify-between p-4 bg-slate-50/80 rounded-xl border border-slate-100">
                  <div>
                    <h4 className="text-sm font-bold text-slate-700">“免唤醒”全双工连读对话</h4>
                    <p className="text-xs text-slate-400 mt-1 font-medium">开启后，孩子可直接连续说话交互，无需每次呼叫唤醒词。待机功耗会略微增加。</p>
                  </div>
                  <button 
                    onClick={() => setFreeWake(!freeWake)}
                    disabled={!deviceState.isBound}
                    className={`shrink-0 w-12 h-6 rounded-full transition-colors relative ml-4 ${freeWake ? 'bg-blue-600' : 'bg-slate-300'} disabled:opacity-50`}
                  >
                    <div className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-all ${freeWake ? 'left-7' : 'left-1'}`}></div>
                  </button>
               </div>
               
               <button 
                 onClick={handleSaveSettings}
                 disabled={!deviceState.isBound}
                 className="w-full py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold text-sm transition-colors disabled:opacity-50"
               >
                 保存偏好设置
               </button>
             </div>
          </div>
        </div>

        {/* 右侧区域：声纹认主 & 音色克隆 */}
        <div className="space-y-6">
          
          {/* 声纹认主模块 */}
          <div className="bg-white rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.02)] border border-slate-100 p-6 flex flex-col">
             <div className="flex items-center gap-2 mb-2">
               <div className="w-8 h-8 rounded-full bg-amber-50 flex items-center justify-center">
                 <span className="material-symbols-outlined text-amber-500 text-[18px]">verified_user</span>
               </div>
               <h3 className="text-lg font-bold text-slate-800">声纹认主 (专属主人验证)</h3>
             </div>
             <p className="text-xs text-slate-500 font-medium mb-6 leading-relaxed">
               录制您或孩子的特征声纹参数。声纹身份确认后，系统才能允许执行如“强制解锁”、“远程重置”等最高级别权限。
             </p>
             
             {/* 录音可视化区 */}
             <div className="relative h-32 bg-slate-900 rounded-2xl border border-slate-800 flex flex-col items-center justify-center p-4 overflow-hidden mb-6">
               
               {isRecording ? (
                  // 录音中：波动条形与倒计时
                  <>
                     <div className="flex items-center gap-1.5 h-12 z-10">
                       {[3, 6, 4, 8, 5, 7, 3, 5, 4, 6, 3].map((val, i) => (
                         <div key={i} className="w-2 bg-amber-500 rounded-full animate-pulse" style={{ height: `${val * 10}%`, animationDelay: `${i * 0.1}s` }}></div>
                       ))}
                     </div>
                     <span className="text-xs font-bold text-amber-500 mt-3 uppercase tracking-widest z-10 flex items-center gap-1">
                       <span className="w-2 h-2 rounded-full bg-amber-500 blur-[2px]"></span>
                       正在倾听... ({10 - (recordProgress / 10)}秒)
                     </span>
                     {/* 底部进度条 */}
                     <div className="absolute bottom-0 left-0 w-full h-1 bg-slate-800">
                       <div className="h-full bg-amber-500 transition-all duration-1000 ease-linear" style={{ width: `${recordProgress}%` }}></div>
                     </div>
                  </>
               ) : voiceprintRegistered ? (
                  // 已注册状态
                  <div className="flex flex-col items-center gap-2 z-10">
                    <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center backdrop-blur-md">
                      <span className="material-symbols-outlined text-2xl">how_to_reg</span>
                    </div>
                    <span className="text-xs font-bold text-emerald-400">已存储核心主人声纹特征</span>
                  </div>
               ) : (
                  // 初始空闲状态
                  <div className="flex flex-col items-center gap-2 opacity-50 z-10">
                     <span className="material-symbols-outlined text-4xl text-slate-500">graphic_eq</span>
                     <span className="text-xs text-slate-400 font-bold tracking-widest">请保持周围环境安静</span>
                  </div>
               )}
               {/* 装饰发光网格 */}
               <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none opacity-20"></div>
             </div>
             
             {/* 录音控制按钮 */}
             <button 
               onClick={handleStartRecording}
               disabled={isRecording || !deviceState.isBound}
               className={`w-full py-3.5 rounded-xl font-bold text-sm transition-all shadow-md flex items-center justify-center gap-2 ${
                 isRecording 
                   ? 'bg-slate-100 text-slate-400 cursor-not-allowed' 
                   : (voiceprintRegistered ? 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 shadow-none' : 'bg-amber-500 hover:bg-amber-600 text-white shadow-amber-500/30')
               }`}
             >
               <span className="material-symbols-outlined text-[18px]">{isRecording ? 'mic_off' : (voiceprintRegistered ? 'replay' : 'mic')}</span>
               {isRecording ? '系统正在收集采样...' : (voiceprintRegistered ? '重新录制更换声纹' : '录制主人声纹 (10秒)')}
             </button>
          </div>

          {/* 音色克隆模块 */}
          <div className="bg-white rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.02)] border border-slate-100 p-6 flex-1 flex flex-col">
             <div className="flex items-center gap-2 mb-2">
               <div className="w-8 h-8 rounded-full bg-purple-50 flex items-center justify-center">
                 <span className="material-symbols-outlined text-purple-500 text-[18px]">family_star</span>
               </div>
               <h3 className="text-lg font-bold text-slate-800">父母原声分身 (音色克隆)</h3>
             </div>
             <p className="text-xs text-slate-500 font-medium mb-6 leading-relaxed">
               您只有短暂的空闲？没关系，上传一段您的录音，AI 即刻能够克隆您的音色参数，代替您为孩子亲切地朗读出童话绘本故事。
             </p>

             <div className="space-y-4 mt-auto">
                {/* 状态流流程区 */}
                <div className="flex flex-col gap-3 relative">
                   <div className="absolute left-4 top-4 bottom-4 w-0.5 bg-slate-100 z-0"></div>
                   
                   {/* 步骤 1 */}
                   <div className="flex items-center gap-4 relative z-10">
                     <button 
                       onClick={handleUploadAudio} 
                       disabled={cloneStatus !== 'idle'}
                       className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-colors ${cloneStatus === 'idle' ? 'bg-white border-slate-300 text-slate-500 hover:border-purple-500 hover:text-purple-600' : 'bg-purple-600 border-purple-600 text-white'}`}
                     >
                       {cloneStatus === 'uploading' ? <span className="material-symbols-outlined text-[16px] animate-spin">refresh</span> : (cloneStatus === 'idle' ? '1' : <span className="material-symbols-outlined text-[16px]">check</span>)}
                     </button>
                     <div className="flex-1 p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between">
                        <span className="text-sm font-bold text-slate-700">上传 5 分钟您的清晰音频</span>
                        {cloneStatus === 'idle' && <span className="text-[10px] bg-slate-200 text-slate-500 px-2 py-0.5 rounded font-bold uppercase tracking-widest hidden sm:block">待上传</span>}
                     </div>
                   </div>

                   {/* 步骤 2 */}
                   <div className="flex items-center gap-4 relative z-10">
                     <button 
                       onClick={handleGenerateClone} 
                       disabled={cloneStatus !== 'uploaded'}
                       className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-colors ${
                         cloneStatus === 'uploading' || cloneStatus === 'idle' ? 'bg-white border-slate-200 text-slate-300' : 
                         (cloneStatus === 'uploaded' ? 'bg-white border-purple-500 text-purple-600' : 'bg-purple-600 border-purple-600 text-white')
                       }`}
                     >
                       {cloneStatus === 'generating' ? <span className="material-symbols-outlined text-[16px] animate-spin">refresh</span> : (cloneStatus === 'generated' ? <span className="material-symbols-outlined text-[16px]">check</span> : '2')}
                     </button>
                     <div className="flex-1 p-3 bg-slate-50 rounded-xl border border-slate-100">
                        <span className={`text-sm font-bold transition-colors ${cloneStatus === 'uploaded' || cloneStatus === 'generating' || cloneStatus === 'generated' ? 'text-slate-700' : 'text-slate-400'}`}>云端 AI 生成克隆音色</span>
                     </div>
                   </div>
                </div>

                {/* 主操作按钮 */}
                <button 
                  onClick={handlePushClone}
                  disabled={cloneStatus !== 'generated' || !deviceState.isBound}
                  className={`w-full py-3.5 mt-2 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 ${
                    cloneStatus === 'generated' 
                      ? 'bg-purple-600 text-white hover:bg-purple-700 shadow-lg shadow-purple-600/30' 
                      : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                  }`}
                >
                  <span className="material-symbols-outlined text-[18px]">cloud_sync</span>
                  将专属原声分身下发到设备
                </button>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ContentControl() {
  // === 1. 时长管控状态 ===
  const [dailyLimit, setDailyLimit] = useState('120'); // 分钟
  const [sessionLimit, setSessionLimit] = useState('30'); // 分钟
  const [isSavingTime, setIsSavingTime] = useState(false);

  // === 2. 禁用时段状态 ===
  const [quietHours, setQuietHours] = useState([
    { id: '1', startTime: '22:00', endTime: '07:30', label: '夜间睡眠', enabled: true },
    { id: '2', startTime: '13:00', endTime: '14:30', label: '午休时间', enabled: true },
  ]);
  const [newQuietHour, setNewQuietHour] = useState({ startTime: '', endTime: '', label: '' });

  // === 3. 内容分级状态 ===
  const [ageGroup, setAgeGroup] = useState('3-5');
  const [contentConfig, setContentConfig] = useState({
    eduScience: true,
    fairyTales: true,
    complexLogic: false,
    internetSlang: false
  });

  // === 4. 白名单资源状态 ===
  const [whitelist, setWhitelist] = useState([
    { id: 'w1', name: '大闹天宫绘本音频.mp3', type: '音频', status: 'approved', time: '2026-04-18 10:20' },
    { id: 'w2', name: '小猪佩奇全集词汇本.txt', type: '文本库', status: 'pending', time: '今天， 09:12' }
  ]);
  const [isUploading, setIsUploading] = useState(false);

  // === 5. 禁用词管理状态 ===
  const [forbiddenWords, setForbiddenWords] = useState(['暴力', '打架', '恐怖', '骗人', '偷']);
  const [newWord, setNewWord] = useState('');

  // === 交互逻辑实现 ===
  const handleSaveTimeLimits = () => {
    setIsSavingTime(true);
    setTimeout(() => {
      setIsSavingTime(false);
      alert('时长管控设置已保存！将限制设备的单次及总计使用时长。');
    }, 800);
  };

  const handleAddQuietHour = () => {
    if (!newQuietHour.startTime || !newQuietHour.endTime || !newQuietHour.label) {
      alert('请完整填写禁用时段的时间与标签');
      return;
    }
    setQuietHours([...quietHours, { id: Date.now().toString(), ...newQuietHour, enabled: true }]);
    setNewQuietHour({ startTime: '', endTime: '', label: '' });
  };

  const handleToggleQuietHour = (id: string) => {
    setQuietHours(quietHours.map(qh => qh.id === id ? { ...qh, enabled: !qh.enabled } : qh));
  };

  const handleDeleteQuietHour = (id: string) => {
    setQuietHours(quietHours.filter(qh => qh.id !== id));
  };

  const handleUploadResource = () => {
    setIsUploading(true);
    setTimeout(() => {
      setIsUploading(false);
      setWhitelist([{ id: Date.now().toString(), name: '新添加的家教资源.pdf', type: '文档', status: 'pending', time: '刚刚' }, ...whitelist]);
      alert('文件上传成功，等待云端 AI 安全审核入库处理。');
    }, 1500);
  };

  const handleAddWord = () => {
    if (newWord.trim() && !forbiddenWords.includes(newWord.trim())) {
      setForbiddenWords([...forbiddenWords, newWord.trim()]);
      setNewWord('');
    }
  };

  const handleRemoveWord = (word: string) => {
    setForbiddenWords(forbiddenWords.filter(w => w !== word));
  };

  return (
    <div className="animate-fade-in space-y-6 max-w-[1200px]">
      {/* 头部标题区 */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-black text-slate-800 tracking-tight">内容与防沉迷管控</h2>
          <p className="text-slate-500 text-sm mt-1 font-medium">配置 AI 伙伴的交互边界、适龄内容过滤规则及健康使用时间</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* ================= 左侧列 ================= */}
        <div className="space-y-6">
          
          {/* 1. 防沉迷与时长管控模块 */}
          <div className="bg-white rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.02)] border border-slate-100 p-6">
            <div className="flex items-center gap-2 mb-6">
               <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center">
                 <span className="material-symbols-outlined text-blue-600 text-[18px]">timer</span>
               </div>
               <h3 className="text-lg font-bold text-slate-800">屏幕与交互时长管控</h3>
            </div>

            <div className="space-y-5 mb-6">
               <div className="flex items-center justify-between">
                 <div>
                   <label className="text-sm font-bold text-slate-700">每日总计使用限制</label>
                   <p className="text-xs text-slate-400 font-medium">超出限制后设备将只提供基础语音助眠</p>
                 </div>
                 <select 
                   value={dailyLimit} 
                   onChange={(e) => setDailyLimit(e.target.value)}
                   className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-700 outline-none focus:border-blue-500"
                 >
                    <option value="60">1 小时</option>
                    <option value="120">2 小时</option>
                    <option value="180">3 小时</option>
                    <option value="unlimited">不限制</option>
                 </select>
               </div>
               
               <div className="flex items-center justify-between">
                 <div>
                   <label className="text-sm font-bold text-slate-700">单次最大交互时长</label>
                   <p className="text-xs text-slate-400 font-medium">超时将触发强制休息眼保健操模式</p>
                 </div>
                 <select 
                   value={sessionLimit} 
                   onChange={(e) => setSessionLimit(e.target.value)}
                   className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-700 outline-none focus:border-blue-500"
                 >
                    <option value="15">15 分钟</option>
                    <option value="30">30 分钟</option>
                    <option value="45">45 分钟</option>
                    <option value="60">60 分钟</option>
                 </select>
               </div>
            </div>

            <button 
               onClick={handleSaveTimeLimits}
               disabled={isSavingTime}
               className="w-full py-3.5 bg-slate-800 text-white hover:bg-slate-900 rounded-xl font-bold text-sm transition-all shadow-md flex items-center justify-center gap-2"
            >
               {isSavingTime ? <span className="material-symbols-outlined animate-spin text-[18px]">sync</span> : <span className="material-symbols-outlined text-[18px]">save</span>}
               {isSavingTime ? '正在应用新规则...' : '保存使用时长规则'}
            </button>
          </div>

          {/* 2. 禁用时段模块 */}
          <div className="bg-white rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.02)] border border-slate-100 p-6 flex flex-col h-auto">
            <div className="flex items-center gap-2 mb-2">
               <div className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center">
                 <span className="material-symbols-outlined text-indigo-500 text-[18px]">block</span>
               </div>
               <h3 className="text-lg font-bold text-slate-800">全静音禁用时段</h3>
            </div>
            <p className="text-xs text-slate-500 font-medium mb-6 leading-relaxed">
              在设置的时段内，设备将进入深度睡眠模式，屏蔽除安全警报外的所有声音与交互，保证孩子休息。
            </p>

            <div className="space-y-3 mb-6">
              {quietHours.map((qh) => (
                <div key={qh.id} className="flex items-center justify-between p-3.5 bg-slate-50 rounded-xl border border-slate-100">
                  <div className={`transition-opacity ${qh.enabled ? 'opacity-100' : 'opacity-40'}`}>
                    <h4 className="text-sm font-bold text-slate-700">{qh.startTime} - {qh.endTime}</h4>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{qh.label}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <button 
                      onClick={() => handleToggleQuietHour(qh.id)}
                      className={`relative w-10 h-5 rounded-full transition-colors ${qh.enabled ? 'bg-blue-600' : 'bg-slate-300'}`}
                    >
                      <div className={`w-3.5 h-3.5 rounded-full bg-white absolute top-0.5 transition-all shadow-sm ${qh.enabled ? 'left-6' : 'left-0.5'}`}></div>
                    </button>
                    <button onClick={() => handleDeleteQuietHour(qh.id)} className="w-6 h-6 flex items-center justify-center rounded-md text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors">
                      <span className="material-symbols-outlined text-[16px]">delete</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* 新增表单 */}
            <div className="mt-auto bg-slate-50 p-4 rounded-xl border border-slate-200 border-dashed">
               <h4 className="text-xs font-bold text-slate-500 mb-3 uppercase tracking-widest">添加新时段</h4>
               <div className="flex gap-2 mb-3">
                 <input type="time" value={newQuietHour.startTime} onChange={e => setNewQuietHour({...newQuietHour, startTime: e.target.value})} className="flex-1 p-2 rounded-lg border border-slate-200 text-sm font-bold text-slate-700 outline-none" />
                 <span className="text-slate-400 flex items-center">-</span>
                 <input type="time" value={newQuietHour.endTime} onChange={e => setNewQuietHour({...newQuietHour, endTime: e.target.value})} className="flex-1 p-2 rounded-lg border border-slate-200 text-sm font-bold text-slate-700 outline-none" />
               </div>
               <div className="flex gap-2">
                 <input type="text" placeholder="标签 (如: 写作业)" value={newQuietHour.label} onChange={e => setNewQuietHour({...newQuietHour, label: e.target.value})} className="flex-[2] p-2 rounded-lg border border-slate-200 text-sm outline-none font-medium" />
                 <button onClick={handleAddQuietHour} className="flex-1 bg-white border border-slate-200 text-slate-700 hover:text-indigo-600 font-bold rounded-lg text-sm transition-colors shadow-sm">添加</button>
               </div>
            </div>
          </div>
          
          {/* 6. 特殊安全强制开关 */}
          <div className="bg-red-50/50 rounded-2xl border border-red-100 p-6">
             <div className="flex items-center justify-between">
                <div>
                   <h3 className="text-sm font-bold text-slate-800 flex items-center gap-1.5">
                     <span className="material-symbols-outlined text-[18px] text-red-500">verified_user</span> 系统级广告与内购拦截
                   </h3>
                   <p className="text-xs text-slate-500 font-medium mt-1">童语乐乐承诺绝不在任何交互中插入广告和诱导性付费</p>
                </div>
                {/* 强制开启不可关闭 */}
                <button disabled className="relative w-12 h-6 rounded-full bg-emerald-500 opacity-80 cursor-not-allowed" title="该保护为系统级，不可关闭">
                   <div className="w-4 h-4 rounded-full bg-white absolute top-1 left-7 shadow-sm"></div>
                   <span className="material-symbols-outlined absolute top-1 right-8 text-[12px] text-emerald-700">lock</span>
                </button>
             </div>
          </div>
        </div>

        {/* ================= 右侧列 ================= */}
        <div className="space-y-6">
          
          {/* 3. 内容分级模块 */}
          <div className="bg-white rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.02)] border border-slate-100 p-6">
             <div className="flex items-center gap-2 mb-4">
               <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center">
                 <span className="material-symbols-outlined text-emerald-500 text-[18px]">family_restroom</span>
               </div>
               <h3 className="text-lg font-bold text-slate-800">教育内容年龄分级</h3>
             </div>
             
             <div className="flex items-center gap-4 mb-6 relative z-10">
                <span className="text-sm font-bold text-slate-700">孩子所在的年龄段：</span>
                <select 
                  value={ageGroup} 
                  onChange={e => setAgeGroup(e.target.value)}
                  className="bg-slate-50 border border-slate-200 text-blue-600 rounded-xl px-4 py-2 font-bold text-sm outline-none focus:border-blue-500 cursor-pointer"
                >
                  <option value="0-3">0 - 3 岁 (婴幼儿)</option>
                  <option value="3-5">3 - 5 岁 (学龄前)</option>
                  <option value="6-8">6 - 8 岁 (小学低年级)</option>
                  <option value="9-12">9 - 12 岁 (小学高年级)</option>
                </select>
             </div>

             <div className="grid grid-cols-2 gap-4">
                {[
                  { id: 'eduScience', label: '启蒙科学百科', icon: 'science' },
                  { id: 'fairyTales', label: '童话寓言故事', icon: 'auto_stories' },
                  { id: 'complexLogic', label: '复杂逻辑推理', icon: 'extension' },
                  { id: 'internetSlang', label: '允许近期网络流行梗', icon: 'tag' }
                ].map((item) => (
                  <div key={item.id} className="flex flex-col gap-2 p-4 bg-slate-50/50 rounded-xl border border-slate-100">
                    <div className="flex justify-between items-start">
                       <span className="material-symbols-outlined text-[20px] text-slate-400">{item.icon}</span>
                       <button 
                          onClick={() => setContentConfig({...contentConfig, [item.id]: !(contentConfig as any)[item.id]})}
                          className={`relative w-9 h-5 rounded-full transition-colors ${!(contentConfig as any)[item.id] ? 'bg-slate-300' : 'bg-emerald-500'}`}
                       >
                         <div className={`w-3.5 h-3.5 rounded-full bg-white absolute top-0.5 transition-all shadow-sm ${(contentConfig as any)[item.id] ? 'left-5' : 'left-0.5'}`}></div>
                       </button>
                    </div>
                    <span className="text-xs font-bold text-slate-700">{item.label}</span>
                  </div>
                ))}
             </div>
          </div>

          {/* 4. 黑词库（禁用词管理）模块 */}
          <div className="bg-white rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.02)] border border-slate-100 p-6">
             <div className="flex items-center gap-2 mb-2">
               <div className="w-8 h-8 rounded-full bg-red-50 flex items-center justify-center">
                 <span className="material-symbols-outlined text-red-500 text-[18px]">gpp_bad</span>
               </div>
               <h3 className="text-lg font-bold text-slate-800">专属禁用黑词库</h3>
             </div>
             <p className="text-xs text-slate-500 font-medium mb-4 leading-relaxed">
               一旦被配置入库，系统会在与孩子交互的边缘计算侧直接阻断含有此类词汇的上下文延展，并立刻生成安全警告。
             </p>

             <div className="flex flex-wrap gap-2 mb-5">
               {forbiddenWords.map(word => (
                 <div key={word} className="flex items-center gap-1.5 px-3 py-1.5 bg-red-50 border border-red-100 text-red-600 rounded-lg text-sm font-bold">
                   {word}
                   <button onClick={() => handleRemoveWord(word)} className="ml-1 w-4 h-4 flex items-center justify-center hover:bg-red-200 rounded-full transition-colors">
                     <span className="material-symbols-outlined text-[12px]">close</span>
                   </button>
                 </div>
               ))}
               {forbiddenWords.length === 0 && <span className="text-sm font-medium text-slate-400 italic">黑名单当前为空</span>}
             </div>

             <div className="flex gap-2">
               <input 
                 type="text" 
                 placeholder="输入你想禁用的特定词汇或概念" 
                 value={newWord}
                 onChange={(e) => setNewWord(e.target.value)}
                 onKeyDown={(e) => e.key === 'Enter' && handleAddWord()}
                 className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:bg-white focus:border-red-400 transition-colors placeholder:text-slate-400 font-medium"
               />
               <button onClick={handleAddWord} className="bg-red-500 hover:bg-red-600 text-white px-5 py-2.5 rounded-xl font-bold text-sm transition-colors shadow-md shadow-red-500/20">
                 加入黑库
               </button>
             </div>
          </div>

          {/* 5. 白名单知识资源中心 */}
          <div className="bg-white rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.02)] border border-slate-100 p-6 flex flex-col h-auto">
             <div className="flex items-center justify-between mb-4">
               <div className="flex items-center gap-2">
                 <div className="w-8 h-8 rounded-full bg-cyan-50 flex items-center justify-center">
                   <span className="material-symbols-outlined text-cyan-500 text-[18px]">verified</span>
                 </div>
                 <h3 className="text-lg font-bold text-slate-800">白名单外接资源</h3>
               </div>
               <button 
                 onClick={handleUploadResource}
                 disabled={isUploading}
                 className="flex items-center gap-1.5 bg-white border border-slate-200 text-slate-700 hover:text-cyan-600 hover:border-cyan-200 hover:bg-cyan-50 px-3 py-1.5 rounded-lg text-xs font-bold transition-all shadow-sm"
               >
                 {isUploading ? <span className="material-symbols-outlined text-[14px] animate-spin">refresh</span> : <span className="material-symbols-outlined text-[14px]">upload_file</span>}
                 本地上传
               </button>
             </div>
             
             <div className="space-y-3">
               {whitelist.map((item) => (
                 <div key={item.id} className="flex justify-between items-center p-4 bg-slate-50 rounded-xl border border-slate-100">
                    <div className="flex flex-col">
                       <span className="text-sm font-bold text-slate-700">{item.name}</span>
                       <span className="text-[10px] text-slate-400 font-medium uppercase tracking-widest mt-1">{item.type} • {item.time}</span>
                    </div>
                    <div>
                       {item.status === 'approved' ? (
                          <span className="flex items-center gap-1 bg-emerald-50 text-emerald-600 border border-emerald-100 px-2 py-1 rounded text-xs font-bold">
                             <span className="material-symbols-outlined text-[12px]">check_circle</span>
                             已通过
                          </span>
                       ) : (
                          <span className="flex items-center gap-1 bg-amber-50 text-amber-600 border border-amber-100 px-2 py-1 rounded text-xs font-bold">
                             <span className="material-symbols-outlined text-[12px] animate-spin">sync</span>
                             AI质检中
                          </span>
                       )}
                    </div>
                 </div>
               ))}
               {whitelist.length === 0 && <p className="text-sm text-slate-400 text-center py-4">暂无独立上传资源，AI 当前仅依赖知识大模型。</p>}
             </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}

function RemoteCompanion() {
  const [textMsg, setTextMsg] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [activeCall, setActiveCall] = useState(false);
  const [pushingId, setPushingId] = useState<string | null>(null);

  const handleSendText = () => {
    if (!textMsg.trim()) return;
    alert(`文字消息“${textMsg}”已发送至设备端并进行语音播报。`);
    setTextMsg('');
  };

  const handlePushResource = (id: string, name: string) => {
    setPushingId(id);
    setTimeout(() => {
      setPushingId(null);
      alert(`已将资源《${name}》强制推送到设备开始播放。`);
    }, 1000);
  };

  return (
    <div className="animate-fade-in space-y-6 max-w-[1200px]">
      <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-black text-slate-800 tracking-tight">远程陪伴与关怀</h2>
          <p className="text-slate-500 text-sm mt-1 font-medium">突破距离限制，随时与孩子取得联系并主动投喂学习内容</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.02)] border border-slate-100">
            <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
               <span className="material-symbols-outlined text-blue-500">mark_email_unread</span>
               下发快捷消息
            </h3>
            <div className="flex flex-col gap-3">
               <textarea 
                 value={textMsg} 
                 onChange={(e) => setTextMsg(e.target.value)} 
                 placeholder="输入您想对孩子说的话，设备端将立刻进行语音播报..."
                 className="w-full h-24 p-4 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium outline-none focus:bg-white focus:border-blue-500 transition-colors resize-none"
               />
               <div className="flex gap-3">
                 <button 
                   onMouseDown={() => setIsRecording(true)}
                   onMouseUp={() => {setIsRecording(false); alert('录音完成并已发送至设备。')}}
                   onMouseLeave={() => isRecording && setIsRecording(false)}
                   className={`flex-1 flex justify-center items-center gap-2 font-bold py-3 rounded-xl border-2 transition-all ${isRecording ? 'bg-amber-500 border-amber-500 text-white animate-pulse' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'}`}
                 >
                   <span className="material-symbols-outlined">{isRecording ? 'mic' : 'mic_none'}</span>
                   {isRecording ? '松开结束录音' : '按住说话发送录音'}
                 </button>
                 <button onClick={handleSendText} className="flex-1 bg-slate-800 hover:bg-slate-900 border border-slate-800 text-white font-bold py-3 rounded-xl transition-all shadow-md">
                   发送文字播报
                 </button>
               </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.02)] border border-slate-100 flex flex-col items-center justify-center py-10">
            <h3 className="text-sm font-bold text-slate-500 mb-6 uppercase tracking-widest text-center">实时双向通讯</h3>
            <button 
              onClick={() => setActiveCall(!activeCall)}
              className={`w-32 h-32 rounded-full flex flex-col items-center justify-center gap-2 shadow-2xl transition-all ${
                activeCall 
                  ? 'bg-red-500 hover:bg-red-600 text-white shadow-red-500/40 animate-pulse' 
                  : 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-emerald-500/40'
              }`}
            >
              <span className="material-symbols-outlined text-4xl">{activeCall ? 'call_end' : 'call'}</span>
              <span className="font-bold text-sm tracking-widest">{activeCall ? '挂断通话' : '发起呼叫'}</span>
            </button>
            <p className="text-xs font-medium mt-6 text-slate-400">将直接打断设备当前任务，强制接通语音电话</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.02)] border border-slate-100 h-full">
          <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
             <span className="material-symbols-outlined text-purple-500">present_to_all</span>
             主动内容推送
          </h3>
          <div className="space-y-4">
            {[
              { id: 'r1', name: '今日英语词汇：动物大集合', duration: '5 mins' },
              { id: 'r2', name: '睡前故事：勇敢的小狮子', duration: '12 mins' },
              { id: 'r3', name: '国学经典：弟子规诵读', duration: '8 mins' },
              { id: 'r4', name: '全家福录音：爸爸的问候', duration: '1 mins' },
            ].map(res => (
              <div key={res.id} className="p-4 flex items-center justify-between border border-slate-100 bg-slate-50 rounded-xl hover:border-slate-200 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-white border border-slate-100 flex items-center justify-center text-slate-400 shadow-sm"><span className="material-symbols-outlined text-[20px]">audio_file</span></div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-800">{res.name}</h4>
                    <p className="text-[10px] font-bold text-slate-400 tracking-widest uppercase mt-1">长度: {res.duration}</p>
                  </div>
                </div>
                <button 
                  onClick={() => handlePushResource(res.id, res.name)}
                  disabled={pushingId === res.id}
                  className="px-4 py-2 bg-white border border-slate-200 text-blue-600 hover:text-white hover:bg-blue-600 hover:border-blue-600 rounded-lg text-xs font-bold transition-all shadow-sm flex items-center gap-1 min-w-[90px] justify-center"
                >
                  {pushingId === res.id ? (
                    <><span className="material-symbols-outlined text-[14px] animate-spin">refresh</span> 下发...</>
                  ) : (
                    <><span className="material-symbols-outlined text-[14px]">send</span> 推送播报</>
                  )}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Settings() {
  const [account, setAccount] = useState({ name: '图图妈妈', phone: '138****8899', email: 'user@example.com' });
  const [pwd, setPwd] = useState({ old: '', new: '', confirm: '' });
  const [isWechatBound, setIsWechatBound] = useState(true);

  const handleSaveAccount = () => {
     alert('账号基本信息已成功更新。');
  };

  const handleSavePassword = () => {
     if (pwd.new !== pwd.confirm) {
       alert('两次输入的新密码不一致，请检查！');
       return;
     }
     if (!pwd.old || !pwd.new) {
       alert('请填写完整的密码信息！');
       return;
     }
     alert('密码修改成功，下次请使用新密码登录。');
     setPwd({ old: '', new: '', confirm: '' });
  };

  const handleLogout = () => {
     alert('您已安全退出当前家长账号，即将返回登录页。');
     window.location.href = '/login';
  };

  return (
    <div className="animate-fade-in max-w-[800px] mx-auto space-y-6">
       <div className="mb-8">
         <h2 className="text-2xl font-black text-slate-800 tracking-tight">系统与账号设置</h2>
         <p className="text-slate-500 text-sm mt-1 font-medium">管理您的家长身份凭证及第三方授权</p>
       </div>

       {/* Section: Account Base Info */}
       <div className="bg-white p-8 rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.02)] border border-slate-100">
         <h3 className="text-sm font-bold text-slate-800 uppercase tracking-widest mb-6">基本账号信息</h3>
         <div className="space-y-4 mb-6">
           <div>
             <label className="block text-xs font-bold text-slate-500 mb-2">家长昵称</label>
             <input type="text" value={account.name} onChange={e => setAccount({...account, name: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium focus:bg-white focus:border-blue-500 outline-none" />
           </div>
           <div className="grid grid-cols-2 gap-4">
             <div>
               <label className="block text-xs font-bold text-slate-500 mb-2">安全手机号</label>
               <input type="text" value={account.phone} disabled className="w-full bg-slate-100/50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium text-slate-400 cursor-not-allowed" />
             </div>
             <div>
               <label className="block text-xs font-bold text-slate-500 mb-2">联系邮箱</label>
               <input type="email" value={account.email} onChange={e => setAccount({...account, email: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium focus:bg-white focus:border-blue-500 outline-none" />
             </div>
           </div>
         </div>
         <button onClick={handleSaveAccount} className="px-6 py-2.5 bg-blue-600 text-white rounded-xl font-bold text-sm shadow-md hover:bg-blue-700 transition-colors">更新个人资料</button>
       </div>

       {/* Section: Password */}
       <div className="bg-white p-8 rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.02)] border border-slate-100">
         <h3 className="text-sm font-bold text-slate-800 uppercase tracking-widest mb-6">安全与密码</h3>
         <div className="space-y-4 mb-6">
           <input type="password" placeholder="当前密码" value={pwd.old} onChange={e => setPwd({...pwd, old: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium focus:bg-white focus:border-blue-500 outline-none" />
           <input type="password" placeholder="新密码" value={pwd.new} onChange={e => setPwd({...pwd, new: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium focus:bg-white focus:border-blue-500 outline-none" />
           <input type="password" placeholder="确认新密码" value={pwd.confirm} onChange={e => setPwd({...pwd, confirm: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium focus:bg-white focus:border-blue-500 outline-none" />
         </div>
         <button onClick={handleSavePassword} className="px-6 py-2.5 bg-slate-800 text-white rounded-xl font-bold text-sm shadow-md hover:bg-slate-900 transition-colors">确认修改密码</button>
       </div>

       {/* Section: Third Party Binding & More */}
       <div className="bg-white p-8 rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.02)] border border-slate-100">
         <h3 className="text-sm font-bold text-slate-800 uppercase tracking-widest mb-6">授权与关于</h3>
         
         <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100 mb-6">
           <div className="flex items-center gap-3">
             <span className="material-symbols-outlined text-[24px] text-green-500">forum</span>
             <div>
               <h4 className="text-sm font-bold text-slate-700">微信通知服务绑定</h4>
               <p className="text-xs text-slate-400 mt-0.5 font-medium">接收环境预警及对话拦截通知</p>
             </div>
           </div>
           <button 
             onClick={() => setIsWechatBound(!isWechatBound)}
             className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all border ${isWechatBound ? 'bg-white border-slate-200 text-slate-500' : 'bg-green-500 border-green-500 text-white shadow-md shadow-green-500/30'}`}
           >
             {isWechatBound ? '解除绑定' : '立即扫码绑定'}
           </button>
         </div>

         <div className="flex gap-4">
            <button onClick={() => alert('童语乐乐 v2.4.0\n版权所有 © 探索未来 AI 科技')} className="flex-1 py-3 bg-white border border-slate-200 hover:bg-slate-50 rounded-xl text-xs font-bold text-slate-600 transition-colors outline-none">关于我们 (v2.4.0)</button>
            <button onClick={() => alert('已在浏览器打开最新的《服务协议与隐私政策》。')} className="flex-1 py-3 bg-white border border-slate-200 hover:bg-slate-50 rounded-xl text-xs font-bold text-slate-600 transition-colors outline-none">服务协议与隐私政策</button>
         </div>
       </div>

       {/* Section: Logout */}
       <div className="pt-4 pb-10">
         <button onClick={handleLogout} className="w-full py-4 text-red-500 bg-red-50 border border-red-100 hover:bg-red-100 rounded-2xl font-bold text-sm transition-colors flex justify-center items-center gap-2">
           <span className="material-symbols-outlined text-[18px]">logout</span>
           安全退出登录
         </button>
       </div>
    </div>
  );
}

export { Dashboard, ChatHistory, Alerts, Reports, DeviceManage, ContentControl, RemoteCompanion, Settings };
