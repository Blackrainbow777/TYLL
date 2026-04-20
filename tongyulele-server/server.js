/**
 * 童语乐乐 - 后端服务入口
 * 技术栈: Node.js + Express + mysql2 + cors
 * 数据库: tongyulele (MySQL, root, 无密码, 3306)
 */

const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');

// ─── 应用初始化 ────────────────────────────────────────────────────────────────
const app = express();
const PORT = process.env.PORT || 3001;

// ─── 中间件 ───────────────────────────────────────────────────────────────────
app.use(cors({
  origin: ['http://localhost:5173', 'http://127.0.0.1:5173', 'http://localhost:3000', 'http://127.0.0.1:3000'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));
app.use(express.json());

// ─── 数据库连接池 ──────────────────────────────────────────────────────────────
const pool = mysql.createPool({
  host: '127.0.0.1',
  port: 3306,
  user: 'root',
  password: 'root',
  database: 'tongyulele',
  charset: 'utf8mb4',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  timezone: '+08:00',
});

// 启动时验证数据库连接
(async () => {
  try {
    const conn = await pool.getConnection();
    console.log('[DB] ?7?3 数据库连接成功 (tongyulele@127.0.0.1:3306)');
    conn.release();
  } catch (err) {
    console.error('[DB] ?7?4 数据库连接失败:', err.message);
    console.error('     请确认 MySQL 已启动，数据库 tongyulele 已创建并执行了 sql/init_schema.sql');
  }
})();

// ─── 统一响应工具 ─────────────────────────────────────────────────────────────
const ok = (res, data = null, msg = 'success') =>
  res.json({ code: 0, msg, data });

const fail = (res, msg = 'error', status = 500) =>
  res.status(status).json({ code: -1, msg, data: null });

// ─── 健康检查 ─────────────────────────────────────────────────────────────────
app.get('/api/health', (req, res) => {
  ok(res, { server: 'running', time: new Date().toISOString() }, '服务正常');
});

// ─── 接口 1: POST /api/chat ───────────────────────────────────────────────────
// 接收前端 / 树莓派发来的聊天数据，写入 t_chat_record 表
// 必填: user_id, device_id, content_text
// 选填: session_id, role, content_type, audio_url, duration_ms,
//       voiceprint_id, emotion_tag, topic_tag, ai_model, tokens_used, chat_at
app.post('/api/chat', async (req, res) => {
  const {
    session_id    = '',
    user_id,
    device_id,
    role          = 1,          // 1-孩子 2-AI助手
    content_type  = 1,          // 1-文本 2-音频 3-混合
    content_text  = null,
    audio_url     = '',
    duration_ms   = 0,
    voiceprint_id = '',
    emotion_tag   = '',
    topic_tag     = '',
    ai_model      = '',
    tokens_used   = 0,
    chat_at       = null,
  } = req.body;

  if (!user_id || !device_id) {
    return fail(res, '缺少必填参数: user_id 和 device_id', 400);
  }

  try {
    const sql = `
      INSERT INTO t_chat_record
        (session_id, user_id, device_id, role, content_type, content_text,
         audio_url, duration_ms, voiceprint_id, emotion_tag, topic_tag,
         ai_model, tokens_used, chat_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const params = [
      session_id, user_id, device_id, role, content_type, content_text,
      audio_url, duration_ms, voiceprint_id, emotion_tag, topic_tag,
      ai_model, tokens_used, chat_at || new Date(),
    ];

    const [result] = await pool.execute(sql, params);
    console.log(`[CHAT] 新增聊天记录 id=${result.insertId}  user=${user_id}  content="${content_text?.slice(0, 30)}"`);
    ok(res, { id: result.insertId }, '聊天记录已保存');
  } catch (err) {
    console.error('[CHAT] 写入失败:', err.message);
    // 外键约束错误给出友好提示
    if (err.code === 'ER_NO_REFERENCED_ROW_2') {
      return fail(res, `外键约束失败：请确认 user_id=${user_id} 和 device_id=${device_id} 在 t_user / t_device 表中已存在`, 400);
    }
    fail(res, '服务器内部错误: ' + err.message);
  }
});

// ─── 接口 2: POST /api/alarm ─────────────────────────────────────────────────
// 接收前端 / 树莓派发来的报警数据，写入 t_alarm 表
// 必填: device_id, user_id
// 选填: alarm_type, alarm_level, sensor_value, sensor_unit,
//       threshold_value, alarm_at, handle_status, handle_note,
//       notify_channels
app.post('/api/alarm', async (req, res) => {
  const {
    device_id,
    user_id,
    alarm_type      = 1,    // 1-烟雾 2-燃气 3-CO 4-温度异常 5-其他
    alarm_level     = 3,    // 1-低 2-中 3-高 4-紧急
    sensor_value    = 0.00,
    sensor_unit     = 'ppm',
    threshold_value = 0.00,
    alarm_at        = null,
    handle_status   = 0,    // 0-未处理 1-已通知 2-已确认 3-已处理 4-误报
    handle_note     = '',
    notify_channels = '["app"]',
  } = req.body;

  if (!device_id || !user_id) {
    return fail(res, '缺少必填参数: device_id 和 user_id', 400);
  }

  try {
    const sql = `
      INSERT INTO t_alarm
        (device_id, user_id, alarm_type, alarm_level, sensor_value, sensor_unit,
         threshold_value, alarm_at, handle_status, handle_note, notify_channels)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const params = [
      device_id, user_id, alarm_type, alarm_level,
      sensor_value, sensor_unit, threshold_value,
      alarm_at || new Date(), handle_status, handle_note,
      typeof notify_channels === 'string' ? notify_channels : JSON.stringify(notify_channels),
    ];

    const [result] = await pool.execute(sql, params);
    console.log(`[ALARM] ?7?2?1?5  新增报警记录 id=${result.insertId}  type=${alarm_type}  level=${alarm_level}  device=${device_id}`);
    ok(res, { id: result.insertId }, '报警记录已保存');
  } catch (err) {
    console.error('[ALARM] 写入失败:', err.message);
    if (err.code === 'ER_NO_REFERENCED_ROW_2') {
      return fail(res, `外键约束失败：请确认 device_id=${device_id} 和 user_id=${user_id} 在 t_device / t_user 表中已存在`, 400);
    }
    fail(res, '服务器内部错误: ' + err.message);
  }
});

// ─── 接口 3: GET /api/alarms ─────────────────────────────────────────────────
// 查询所有报警记录，支持 limit / status / type 查询参数
// 示例: GET /api/alarms?limit=20&status=0&type=1
app.get('/api/alarms', async (req, res) => {
  const {
    limit  = 50,
    status,       // handle_status
    type,         // alarm_type
    device_id,
    user_id,
  } = req.query;

  const conditions = [];
  const params = [];

  if (status !== undefined) {
    conditions.push('a.handle_status = ?');
    params.push(Number(status));
  }
  if (type !== undefined) {
    conditions.push('a.alarm_type = ?');
    params.push(Number(type));
  }
  if (device_id !== undefined) {
    conditions.push('a.device_id = ?');
    params.push(Number(device_id));
  }
  if (user_id !== undefined) {
    conditions.push('a.user_id = ?');
    params.push(Number(user_id));
  }

  const where = conditions.length ? 'WHERE ' + conditions.join(' AND ') : '';

  try {
    const sql = `
      SELECT
        a.id,
        a.device_id,
        a.user_id,
        a.alarm_type,
        a.alarm_level,
        a.sensor_value,
        a.sensor_unit,
        a.threshold_value,
        a.alarm_at,
        a.handle_status,
        a.handle_note,
        a.handled_at,
        a.notify_channels,
        a.created_at
      FROM t_alarm a
      ${where}
      ORDER BY a.alarm_at DESC
      LIMIT ?
    `;
    params.push(Number(limit));

    // 使用 query() 而非 execute()，避免 LIMIT 在 prepared statement 中的类型问题
    const [rows] = await pool.query(sql, params);
    console.log(`[ALARMS] 查询到 ${rows.length} 条报警记录`);
    ok(res, rows, `查询成功，共 ${rows.length} 条`);
  } catch (err) {
    console.error('[ALARMS] 查询失败:', err.message);
    fail(res, '服务器内部错误: ' + err.message);
  }
});

// ─── 404 处理 ─────────────────────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ code: 404, msg: `接口 ${req.method} ${req.path} 不存在`, data: null });
});

// ─── 全局异常兜底 ─────────────────────────────────────────────────────────────
app.use((err, req, res, _next) => {
  console.error('[ERROR]', err);
  res.status(500).json({ code: -1, msg: '服务器内部错误', data: null });
});

// ─── 启动 ─────────────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log('');
  console.log('╔══════════════════════════════════════════════╗');
  console.log('║   童语乐乐 后端服务 已启动                      ║');
  console.log(`║   http://localhost:${PORT}                        ║`);
  console.log('╠══════════════════════════════════════════════╣');
  console.log('║  POST /api/chat    → 保存聊天记录              ║');
  console.log('║  POST /api/alarm   → 上报报警事件              ║');
  console.log('║  GET  /api/alarms  → 查询所有报警记录          ║');
  console.log('║  GET  /api/health  → 健康检查                  ║');
  console.log('╚══════════════════════════════════════════════╝');
  console.log('');
});
