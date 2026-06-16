"use client";
import React, { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { doc, getDoc, setDoc, collection, getDocs, deleteDoc, addDoc, updateDoc } from "firebase/firestore";

export default function AdminPage() {
  const [content, setContent] = useState<any>(null);
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsLoggedIn(sessionStorage.getItem("adminLoggedIn") === "true");
    }
  }, []);

  const contentDocRef = doc(db, "content", "main");
  const blogsColRef = collection(db, "blogs");

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch main content (image & projects)
        const docSnap = await getDoc(contentDocRef);
        if (docSnap.exists()) {
          setContent(docSnap.data());
        } else {
          setContent({ mainImage: "", projects: [] });
        }

        // Fetch blogs
        const blogsSnap = await getDocs(blogsColRef);
        const blogsData = blogsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setBlogs(blogsData);
      } catch (err) {
        console.error("Failed to fetch data:", err);
        setMessage("Error loading data from Firebase. Check your configuration.");
      } finally {
        setLoading(false);
      }
    };
    if (isLoggedIn) {
      fetchData();
    } else {
      setLoading(false);
    }
  }, [isLoggedIn]);

  const handleLogin = () => {
    if (username === "admin" && password === "admin123@") {
      setIsLoggedIn(true);
      sessionStorage.setItem("adminLoggedIn", "true");
      setLoginError("");
    } else {
      setLoginError("Invalid credentials");
    }
  };

  const handleSaveContent = async () => {
    setSaving(true);
    setMessage("");
    try {
      await setDoc(contentDocRef, content);
      setMessage("Content saved successfully!");
    } catch (err) {
      console.error(err);
      setMessage("Error saving content.");
    }
    setSaving(false);
    setTimeout(() => setMessage(""), 3000);
  };

  const handleProjectChange = (id: string, field: string, value: string) => {
    setContent((prev: any) => ({
      ...prev,
      projects: prev.projects.map((p: any) => (p.id === id ? { ...p, [field]: value } : p)),
    }));
  };

  const handleTagChange = (id: string, tagsStr: string) => {
    const tags = tagsStr.split(",").map((t) => t.trim()).filter((t) => t);
    setContent((prev: any) => ({
      ...prev,
      projects: prev.projects.map((p: any) => (p.id === id ? { ...p, tags } : p)),
    }));
  };

  const addProject = () => {
    const newProject = {
      id: Date.now().toString(),
      cat: "New Category",
      title: "New Project",
      result: "Result here",
      tags: [],
      image: "",
    };
    setContent((prev: any) => ({
      ...prev,
      projects: [newProject, ...(prev.projects || [])],
    }));
  };

  const removeProject = (id: string) => {
    setContent((prev: any) => ({
      ...prev,
      projects: prev.projects.filter((p: any) => p.id !== id),
    }));
  };

  // Blog Management Functions
  const handleBlogChange = (id: string, field: string, value: string) => {
    setBlogs((prev) => prev.map((b) => (b.id === id ? { ...b, [field]: value } : b)));
  };

  const handleBlogContentChange = (id: string, contentStr: string) => {
    const contentArr = contentStr.split("\\n\\n").map(p => p.trim()).filter(p => p);
    setBlogs((prev) => prev.map((b) => (b.id === id ? { ...b, content: contentArr } : b)));
  };

  const addBlog = async () => {
    try {
      const newBlog = {
        title: "New Blog Post",
        excerpt: "Short description...",
        date: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
        category: "General",
        readTime: "5 min read",
        content: ["First paragraph here..."],
        createdAt: Date.now()
      };
      const docRef = await addDoc(blogsColRef, newBlog);
      setBlogs([{ id: docRef.id, ...newBlog }, ...blogs]);
      setMessage("Blog added!");
      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      console.error(err);
      setMessage("Error adding blog.");
    }
  };

  const saveBlog = async (blog: any) => {
    try {
      const blogRef = doc(db, "blogs", blog.id);
      const { id, ...blogData } = blog; // Remove id from data to be saved
      await updateDoc(blogRef, blogData);
      setMessage("Blog saved successfully!");
      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      console.error(err);
      setMessage("Error saving blog.");
    }
  };

  const removeBlog = async (id: string) => {
    if(!confirm("Are you sure you want to delete this blog?")) return;
    try {
      await deleteDoc(doc(db, "blogs", id));
      setBlogs((prev) => prev.filter((b) => b.id !== id));
      setMessage("Blog deleted!");
      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      console.error(err);
      setMessage("Error deleting blog.");
    }
  };

  if (loading) {
    return <div className="p-10 text-white min-h-screen bg-[#0a0a0a]">Loading admin...</div>;
  }

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-4 font-sans">
        <div className="bg-[#111] border border-gray-800 p-8 rounded-2xl w-full max-w-sm shadow-2xl">
          <h2 className="text-2xl font-bold text-white mb-6 text-center tracking-tight">Admin Login</h2>
          {loginError && <p className="text-red-500 text-sm mb-4 text-center bg-red-500/10 py-2 rounded-md">{loginError}</p>}
          <div className="space-y-5">
            <div>
              <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">Username</label>
              <input 
                type="text" 
                value={username} 
                onChange={e => setUsername(e.target.value)} 
                className="w-full bg-black border border-gray-800 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-[#9ffb2b]" 
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">Password</label>
              <input 
                type="password" 
                value={password} 
                onChange={e => setPassword(e.target.value)} 
                onKeyDown={e => e.key === 'Enter' && handleLogin()} 
                className="w-full bg-black border border-gray-800 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-[#9ffb2b]" 
              />
            </div>
            <button 
              onClick={handleLogin} 
              className="w-full bg-[#9ffb2b] text-black font-bold py-3 rounded-lg hover:opacity-90 transition mt-2 shadow-[0_0_15px_rgba(159,251,43,0.2)]"
            >
              Sign In
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white p-8 font-sans">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-10 border-b border-white/10 pb-6">
          <h1 className="text-3xl font-bold text-[#9ffb2b]">Portfolio Admin</h1>
          <div className="flex items-center gap-4">
            {message && <span className="text-green-400 text-sm font-medium bg-green-400/10 px-4 py-2 rounded-lg">{message}</span>}
            <button
              onClick={handleSaveContent}
              disabled={saving}
              className="bg-[#9ffb2b] text-black px-6 py-2 rounded-lg font-semibold hover:opacity-90 disabled:opacity-50 transition shadow-[0_0_15px_rgba(159,251,43,0.3)]"
            >
              {saving ? "Saving..." : "Save Main Content"}
            </button>
            <a href="/" target="_blank" className="text-gray-400 hover:text-white transition bg-white/5 px-4 py-2 rounded-lg">View Site</a>
            <button
              onClick={() => { setIsLoggedIn(false); sessionStorage.removeItem("adminLoggedIn"); }}
              className="text-gray-400 hover:text-white transition bg-red-500/10 px-4 py-2 rounded-lg ml-2"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Main Image Section */}
        <section className="bg-[#111] border border-gray-800 rounded-2xl p-6 mb-10 shadow-xl">
          <h2 className="text-xl font-bold mb-6 text-gray-200 flex items-center gap-2">
            <span className="w-2 h-6 bg-[#9ffb2b] rounded-full inline-block"></span>
            Main Profile Image
          </h2>
          <div className="flex items-start gap-8">
            <div className="w-48 h-48 bg-black rounded-xl overflow-hidden border border-gray-800 flex items-center justify-center relative shadow-inner">
              {content?.mainImage ? (
                <img src={content.mainImage} alt="Main" className="w-full h-full object-contain" />
              ) : (
                <span className="text-gray-600 text-sm">No Image</span>
              )}
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-400 mb-2">Image URL</label>
              <input
                type="text"
                value={content?.mainImage || ""}
                onChange={(e) => setContent((prev: any) => ({ ...prev, mainImage: e.target.value }))}
                className="w-full bg-black border border-gray-800 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-[#9ffb2b] focus:ring-1 focus:ring-[#9ffb2b] transition"
                placeholder="https://example.com/image.png"
              />
              <p className="text-xs text-gray-500 mt-3">Paste the link of your image here. Recommended: PNG or WebP with transparent background.</p>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section className="bg-[#111] border border-gray-800 rounded-2xl p-6 shadow-xl mb-10">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-200 flex items-center gap-2">
              <span className="w-2 h-6 bg-[#9ffb2b] rounded-full inline-block"></span>
              Projects ({content?.projects?.length || 0})
            </h2>
            <button
              onClick={addProject}
              className="bg-white/10 text-white px-4 py-2 rounded-lg text-sm hover:bg-white/20 transition flex items-center gap-2"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M5 12h14"/></svg>
              Add Project
            </button>
          </div>

          <div className="space-y-6">
            {content?.projects?.map((project: any) => (
              <div key={project.id} className="bg-black border border-gray-800 rounded-xl p-5 relative group transition hover:border-gray-700">
                <button
                  onClick={() => removeProject(project.id)}
                  className="absolute top-4 right-4 text-red-500 hover:text-red-400 text-sm opacity-0 group-hover:opacity-100 transition flex items-center gap-1 bg-red-500/10 px-3 py-1 rounded-md"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
                  Remove
                </button>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Image Column */}
                  <div className="col-span-1">
                    <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">Project Image URL</label>
                    <div className="aspect-video bg-[#111] rounded-lg overflow-hidden border border-gray-800 mb-3 relative flex items-center justify-center">
                      {project.image ? (
                        <img src={project.image} alt="Project" className="w-full h-full object-cover" />
                      ) : (
                        <span className="text-xs text-gray-600">No Image</span>
                      )}
                    </div>
                    <input
                      type="text"
                      value={project.image || ""}
                      onChange={(e) => handleProjectChange(project.id, "image", e.target.value)}
                      placeholder="Image URL"
                      className="w-full bg-[#111] border border-gray-800 rounded-md px-3 py-2 text-xs text-white focus:outline-none focus:border-[#9ffb2b]"
                    />
                  </div>
                  
                  {/* Fields Column */}
                  <div className="col-span-2 grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Title</label>
                      <input
                        type="text"
                        value={project.title}
                        onChange={(e) => handleProjectChange(project.id, "title", e.target.value)}
                        className="w-full bg-[#111] border border-gray-800 rounded-md px-3 py-2 text-sm text-white focus:outline-none focus:border-[#9ffb2b]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Category</label>
                      <input
                        type="text"
                        value={project.cat}
                        onChange={(e) => handleProjectChange(project.id, "cat", e.target.value)}
                        className="w-full bg-[#111] border border-gray-800 rounded-md px-3 py-2 text-sm text-white focus:outline-none focus:border-[#9ffb2b]"
                      />
                    </div>
                    <div className="col-span-2">
                      <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Result (Subtitle)</label>
                      <input
                        type="text"
                        value={project.result}
                        onChange={(e) => handleProjectChange(project.id, "result", e.target.value)}
                        className="w-full bg-[#111] border border-gray-800 rounded-md px-3 py-2 text-sm text-white focus:outline-none focus:border-[#9ffb2b]"
                      />
                    </div>
                    <div className="col-span-2">
                      <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Tags (Comma separated)</label>
                      <input
                        type="text"
                        value={project.tags?.join(", ") || ""}
                        onChange={(e) => handleTagChange(project.id, e.target.value)}
                        className="w-full bg-[#111] border border-gray-800 rounded-md px-3 py-2 text-sm text-white focus:outline-none focus:border-[#9ffb2b]"
                        placeholder="e.g. SEO, Content, Design"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {content?.projects?.length === 0 && (
              <div className="text-center py-10 text-gray-500">No projects yet. Add one above.</div>
            )}
          </div>
        </section>

        {/* Blogs Section */}
        <section className="bg-[#111] border border-gray-800 rounded-2xl p-6 shadow-xl">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-200 flex items-center gap-2">
              <span className="w-2 h-6 bg-[#9ffb2b] rounded-full inline-block"></span>
              Blog Posts ({blogs.length})
            </h2>
            <button
              onClick={addBlog}
              className="bg-white/10 text-white px-4 py-2 rounded-lg text-sm hover:bg-white/20 transition flex items-center gap-2"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M5 12h14"/></svg>
              Add Blog Post
            </button>
          </div>

          <div className="space-y-6">
            {blogs.map((blog: any) => (
              <div key={blog.id} className="bg-black border border-gray-800 rounded-xl p-5 relative group transition hover:border-gray-700">
                <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition">
                   <button
                    onClick={() => saveBlog(blog)}
                    className="text-green-500 hover:text-green-400 text-sm bg-green-500/10 px-3 py-1 rounded-md transition font-medium"
                  >
                    Save Post
                  </button>
                  <button
                    onClick={() => removeBlog(blog.id)}
                    className="text-red-500 hover:text-red-400 text-sm bg-red-500/10 px-3 py-1 rounded-md transition"
                  >
                    Delete
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                  {/* Fields Column */}
                  <div className="col-span-1 space-y-4">
                    <div>
                      <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Title</label>
                      <input
                        type="text"
                        value={blog.title || ""}
                        onChange={(e) => handleBlogChange(blog.id, "title", e.target.value)}
                        className="w-full bg-[#111] border border-gray-800 rounded-md px-3 py-2 text-sm text-white focus:outline-none focus:border-[#9ffb2b]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Date</label>
                      <input
                        type="text"
                        value={blog.date || ""}
                        onChange={(e) => handleBlogChange(blog.id, "date", e.target.value)}
                        className="w-full bg-[#111] border border-gray-800 rounded-md px-3 py-2 text-sm text-white focus:outline-none focus:border-[#9ffb2b]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Category</label>
                      <input
                        type="text"
                        value={blog.category || ""}
                        onChange={(e) => handleBlogChange(blog.id, "category", e.target.value)}
                        className="w-full bg-[#111] border border-gray-800 rounded-md px-3 py-2 text-sm text-white focus:outline-none focus:border-[#9ffb2b]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Read Time</label>
                      <input
                        type="text"
                        value={blog.readTime || ""}
                        onChange={(e) => handleBlogChange(blog.id, "readTime", e.target.value)}
                        className="w-full bg-[#111] border border-gray-800 rounded-md px-3 py-2 text-sm text-white focus:outline-none focus:border-[#9ffb2b]"
                      />
                    </div>
                  </div>
                  
                  {/* Content Column */}
                  <div className="col-span-2 space-y-4">
                     <div>
                      <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Excerpt (Short Description)</label>
                      <textarea
                        rows={2}
                        value={blog.excerpt || ""}
                        onChange={(e) => handleBlogChange(blog.id, "excerpt", e.target.value)}
                        className="w-full bg-[#111] border border-gray-800 rounded-md px-3 py-2 text-sm text-white focus:outline-none focus:border-[#9ffb2b] resize-y"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Content (Separate paragraphs with double enter)</label>
                      <textarea
                        rows={6}
                        value={(blog.content || []).join("\n\n")}
                        onChange={(e) => handleBlogContentChange(blog.id, e.target.value)}
                        className="w-full bg-[#111] border border-gray-800 rounded-md px-3 py-2 text-sm text-white focus:outline-none focus:border-[#9ffb2b] resize-y font-mono"
                        placeholder="First paragraph...&#10;&#10;Second paragraph..."
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {blogs.length === 0 && (
              <div className="text-center py-10 text-gray-500">No blog posts yet. Add one above.</div>
            )}
          </div>
        </section>

      </div>
    </div>
  );
}
