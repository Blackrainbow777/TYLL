import { useNavigate } from 'react-router-dom';

export default function Register() {
  const navigate = useNavigate();

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    // After registration, usually redirect to the app or login
    navigate('/standard');
  };

  return (
    <div className="bg-surface text-on-surface min-h-screen flex flex-col items-center justify-center p-6 bg-login-pattern">
      <main className="w-full max-w-[1200px] grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Side: Emotional Anchor / Brand Illustration */}
        <div className="hidden lg:flex flex-col space-y-8 pr-12">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center shadow-lg shadow-primary/20">
              <span className="material-symbols-outlined text-white text-2xl">face</span>
            </div>
            <span className="text-3xl font-black tracking-tight text-primary">童语乐乐</span>
          </div>
          <div className="space-y-4">
            <h2 className="text-5xl font-extrabold leading-[1.2] text-on-background">
              开启<span className="text-primary">专属AI</span><br />伴学新篇章。
            </h2>
            <p className="text-on-surface-variant text-xl leading-relaxed max-w-md">
              为您的孩子创建一个账号，探索安全、有趣、智能的成长世界。
            </p>
          </div>
          <div className="relative w-full aspect-square max-w-sm">
            <div className="absolute inset-0 bg-primary-container/20 rounded-xl -rotate-6 scale-95"></div>
            <img 
              className="relative z-10 w-full h-full object-cover rounded-xl shadow-2xl" 
              alt="一个友好的、质感柔软的 3D 机器人角色" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCJm6kON_lePVjS9uLhcuFDWjTx4_2IZrloQXXUh0MGbwMXhu7ITgeHaH__tZqQD5hnv1T0_2kMc7Pgr9So4QyNl6JOfNQldMozQz4FkDP_BuO1z5cGCsFuxuHk-cQT5nY2e22gfDEyPot2b-YQg8RDj7oxJsqh3LYfc3WLWPh9O1PNclkRSVKeptYaL8dFGZ29VWEQNZLWbG_utWjDKKQXCHMcT4Ai1PF0KTxNFLiymrRN_AvsApQ3QkF1iKxbJWf34D5AWD-6U57X" 
              referrerPolicy="no-referrer"
            />
          </div>
        </div>

        {/* Right Side: Register Card */}
        <div className="flex justify-center lg:justify-start">
          <div className="w-full max-w-md bg-surface-container-lowest rounded-xl p-10 shadow-[0_12px_32px_rgba(44,47,49,0.06)] border border-white/50 backdrop-blur-sm">
            <div className="mb-8 text-center lg:text-left">
              <div className="lg:hidden flex items-center justify-center mb-6">
                <span className="text-2xl font-black text-primary">童语乐乐</span>
              </div>
              <h1 className="text-3xl font-bold tracking-tight text-on-background mb-2">创建账号</h1>
              <p className="text-on-surface-variant font-medium">加入乐乐 AI 的奇妙旅程</p>
            </div>
            <form className="space-y-5" onSubmit={handleRegister}>
              <div className="space-y-2">
                <label className="block text-sm font-bold text-on-surface-variant px-1" htmlFor="phone-input">
                  手机号码或家长邮箱
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-outline">
                    <span className="material-symbols-outlined text-xl">mail</span>
                  </div>
                  <input 
                    className="w-full pl-12 pr-4 py-4 bg-surface-container-highest/30 border-none rounded-lg focus:ring-4 focus:ring-primary-fixed/30 transition-all text-on-surface placeholder:text-outline/50 font-medium" 
                    id="phone-input" 
                    placeholder="请输入联系方式" 
                    type="text" 
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-bold text-on-surface-variant px-1" htmlFor="child-name">
                  孩子昵称
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-outline">
                    <span className="material-symbols-outlined text-xl">face</span>
                  </div>
                  <input 
                    className="w-full pl-12 pr-4 py-4 bg-surface-container-highest/30 border-none rounded-lg focus:ring-4 focus:ring-primary-fixed/30 transition-all text-on-surface placeholder:text-outline/50 font-medium" 
                    id="child-name" 
                    placeholder="例如：乐乐" 
                    type="text" 
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-bold text-on-surface-variant px-1" htmlFor="password-input">
                  设置密码
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-outline">
                    <span className="material-symbols-outlined text-xl">lock</span>
                  </div>
                  <input 
                    className="w-full pl-12 pr-4 py-4 bg-surface-container-highest/30 border-none rounded-lg focus:ring-4 focus:ring-primary-fixed/30 transition-all text-on-surface placeholder:text-outline/50 font-medium" 
                    id="password-input" 
                    placeholder="至少 8 位包含字母和数字" 
                    type="password" 
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-bold text-on-surface-variant px-1" htmlFor="confirm-password-input">
                  确认密码
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-outline">
                    <span className="material-symbols-outlined text-xl">lock_reset</span>
                  </div>
                  <input 
                    className="w-full pl-12 pr-4 py-4 bg-surface-container-highest/30 border-none rounded-lg focus:ring-4 focus:ring-primary-fixed/30 transition-all text-on-surface placeholder:text-outline/50 font-medium" 
                    id="confirm-password-input" 
                    placeholder="请再次输入密码以确认" 
                    type="password" 
                    required
                  />
                </div>
              </div>
              
              <div className="pt-4 flex flex-col space-y-4">
                <button 
                  className="w-full py-5 px-8 rounded-full bg-gradient-to-br from-primary to-primary-container text-on-primary font-bold text-lg shadow-lg shadow-primary/30 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center space-x-2" 
                  type="submit"
                >
                  <span className="material-symbols-outlined text-lg">person_add</span>
                  <span>同意政策并注册</span>
                </button>
                <div className="relative py-2">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-surface-container-high"></div>
                  </div>
                  <div className="relative flex justify-center text-xs tracking-widest font-bold">
                    <span className="bg-surface-container-lowest px-4 text-outline/60">已有账号？</span>
                  </div>
                </div>
                <button 
                  className="w-full py-4 px-8 rounded-full bg-secondary-container/50 text-slate-600 font-bold text-base hover:bg-secondary-container hover:scale-[1.02] active:scale-95 transition-all" 
                  type="button"
                  onClick={() => navigate('/')}
                >
                  返回登录
                </button>
              </div>
            </form>
            <p className="mt-6 text-center text-xs text-on-surface-variant/60 font-medium px-4">
              注册即表示您同意我们的 
              <a className="underline hover:text-primary ml-1" href="#">服务条款</a> 和 
              <a className="underline hover:text-primary ml-1" href="#">儿童安全政策</a>。
            </p>
          </div>
        </div>
      </main>
      {/* Footer Decoration: Tonal Layering */}
      <div className="fixed bottom-0 left-0 w-full h-1/3 -z-10 bg-gradient-to-t from-surface-container-low to-transparent opacity-50"></div>
    </div>
  );
}
