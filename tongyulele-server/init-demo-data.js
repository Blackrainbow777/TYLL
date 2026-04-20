/**
 * 演示数据初始化脚本（仅用于答辩演示）
 * 运行: node init-demo-data.js
 * 作用: 插入一个测试用户和测试设备，使 /api/alarm 和 /api/chat 接口可正常写入
 */

const mysql = require('mysql2/promise');

const DB_CONFIG = {
  host: '127.0.0.1',
  port: 3306,
  user: 'root',
  password: 'root',
  database: 'tongyulele',
};

(async () => {
  const pool = mysql.createPool(DB_CONFIG);
  try {
    // 插入演示用户（id=1）
    await pool.execute(
      `INSERT IGNORE INTO t_user
         (id, phone, nickname, child_name, child_gender, password_hash)
       VALUES (1, '13800000001', '演示家长', '小乐', 1, 'demo_hash')`
    );
    console.log('[OK] t_user  演示家长 (id=1) 已准备好');

    // 插入演示设备（id=1）
    await pool.execute(
      `INSERT IGNORE INTO t_device
         (id, device_sn, device_name, mac_address, firmware_ver, bind_user_id)
       VALUES (1, 'SN-DEMO-001', '童语乐乐终端-演示', 'AA:BB:CC:DD:EE:01', 'v1.0.0', 1)`
    );
    console.log('[OK] t_device 童语乐乐终端-演示 (id=1) 已准备好');

    // 绑定设备到用户
    await pool.execute('UPDATE t_user SET device_id = 1 WHERE id = 1');
    console.log('[OK] 用户与设备绑定完成');

    console.log('');
    console.log('演示数据初始化完成！现在可以测试以下接口：');
    console.log('  POST /api/alarm   -> 传入 device_id:1, user_id:1');
    console.log('  POST /api/chat    -> 传入 device_id:1, user_id:1');
    console.log('  GET  /api/alarms  -> 查询所有报警记录');
  } catch (err) {
    console.error('[ERR]', err.message);
  } finally {
    await pool.end();
  }
})();
