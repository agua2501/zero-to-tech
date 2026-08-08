import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import { api } from "../api/client";
import "../../js/登录/Login.css";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState({ username: "", password: "" });
  const [msg, setMsg] = useState("");
  const [msgType, setMsgType] = useState("");

  const clearForm = () => {
    setForm({ username: "", password: "" });
    setMsg("");
    setMsgType("");
  };

  const handleSubmit = async () => {
    const username = form.username.trim();
    const password = form.password.trim();
    if (!username || !password) {
      setMsg("请输入用户名和密码");
      setMsgType("");
      return;
    }
    setMsg("登录中...");
    setMsgType("");
    const { data } = await api.post("/api/auth/login", { username, password });
    if (data && data.ok) {
      login(data.data.username, data.data.token);
      setMsg("登录成功！正在跳转...");
      setMsgType("success");
      setTimeout(() => navigate("/"), 800);
    } else {
      setMsg((data && data.msg) || "用户名或密码错误");
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
            <h2>大炮茂登录</h2>
            <p>茂名旅游网站 · 用户登录</p>
          </div>
          <div className="inside">
            <div id="loginMsg" className={msgType}>{msg}</div>
            <input
              type="text"
              placeholder="请输入账户"
              value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
            />
            <input
              type="password"
              placeholder="请输入密码"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSubmit();
              }}
            />
            <div className="btn">
              <button type="button" onClick={clearForm}>清空重填</button>
              <button type="button" onClick={handleSubmit}>登 录</button>
              <Link to="/register"><button type="button">注 册</button></Link>
            </div>
            <hr />
            <div className="icon">
              <img src="/login/qq.png" alt="QQ登录" title="QQ登录" />
              <img src="/login/wechat.png" alt="微信登录" title="微信登录" />
              <img src="/login/weibo.png" alt="微博登录" title="微博登录" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}