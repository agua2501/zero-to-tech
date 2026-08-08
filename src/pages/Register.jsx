import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../api/client";
import "../../js/登录/Register.css";

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [msg, setMsg] = useState("");
  const [msgType, setMsgType] = useState("");

  const handleSubmit = async () => {
    const username = form.username.trim();
    const email = form.email.trim();
    const password = form.password.trim();
    if (!username || !email || !password) {
      setMsg("请填写完整信息");
      setMsgType("");
      return;
    }
    setMsg("注册中...");
    setMsgType("");
    const { data } = await api.post("/api/auth/register", { username, email, password });
    if (data && data.ok) {
      setMsg("注册成功！即将跳转到登录页...");
      setMsgType("success");
      setTimeout(() => navigate("/login"), 800);
    } else {
      setMsg((data && data.msg) || "注册失败");
      setMsgType("");
    }
  };

  return (
    <>
      <nav className="login-nav">
        <span className="nav-title">茂名旅游</span>
        <Link to="/">返回首页</Link>
      </nav>
      <div className="login-wrapper">
        <div className="outside">
          <div className="outside-top">
            <h2>注册账号</h2>
            <p>茂名旅游网站 · 新用户注册</p>
          </div>
          <div className="inside">
            <div id="regMsg" className={msgType}>{msg}</div>
            <input
              type="email"
              placeholder="请输入邮箱"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
            <input
              type="text"
              placeholder="请设置账户"
              value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
            />
            <input
              type="password"
              placeholder="请设置密码"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSubmit();
              }}
            />
            <div className="btn">
              <Link to="/login">已有账号？点此登录</Link>
              <button type="button" onClick={handleSubmit}>注 册</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}