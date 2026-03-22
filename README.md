# 🪲 Meetle — Meet in the Middle

Find the fair middle ground between two locations. Meetle calculates the midpoint and suggests real places to meet.

**Live at:** [meetle.us](https://meetle.us)

---

## 🚀 Deploy to Vercel (Step by Step)

### Prerequisites
You'll need accounts on three free services:
- **GitHub** → [github.com](https://github.com) (stores your code)
- **Vercel** → [vercel.com](https://vercel.com) (hosts your app for free)
- **Anthropic** → [platform.claude.com](https://platform.claude.com) (API key for the AI)

---

### Step 1: Get an Anthropic API Key
1. Go to [platform.claude.com](https://platform.claude.com)
2. Sign up or log in
3. Go to **API Keys** in the sidebar
4. Click **Create Key** and copy it somewhere safe
5. Add a few dollars of credit (each Meetle search costs ~$0.01)

### Step 2: Push Code to GitHub
1. Go to [github.com/new](https://github.com/new) and create a new repository called `meetle`
2. Keep it **Public** or **Private** (either works)
3. On your computer, open a terminal and run:

```bash
cd meetle-app
git init
git add .
git commit -m "Initial Meetle app"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/meetle.git
git push -u origin main
```

> **Don't have Git?** Download it at [git-scm.com](https://git-scm.com/downloads).
> Or use the GitHub web interface: click "Upload files" on your new repo and drag in all the files.

### Step 3: Deploy on Vercel
1. Go to [vercel.com](https://vercel.com) and sign in with your GitHub account
2. Click **"Add New Project"**
3. Import your `meetle` repository from the list
4. Vercel will auto-detect it as a Vite project — leave defaults as-is
5. **Before clicking Deploy**, expand **"Environment Variables"** and add:
   - **Key:** `ANTHROPIC_API_KEY`
   - **Value:** your API key from Step 1
6. Click **Deploy** — takes about 60 seconds

### Step 4: Connect Your Domain (meetle.us)
1. In your Vercel project, go to **Settings → Domains**
2. Type `meetle.us` and click **Add**
3. Vercel will show you DNS records to add. Go to wherever you bought meetle.us (Namecheap, GoDaddy, etc.)
4. In your domain's DNS settings, add the records Vercel shows you (usually just one A record and a CNAME)
5. Wait 5-15 minutes for DNS to propagate
6. You're live at **meetle.us** 🎉

---

## 🛠 Local Development

```bash
# Install dependencies
npm install

# Create your .env file
cp .env.example .env
# Edit .env and add your ANTHROPIC_API_KEY

# Start dev server
npm run dev
```

> Note: The API route (`/api/meetle`) only works on Vercel. For local dev, you'll need to use `vercel dev` instead of `npm run dev` to test the full stack locally.

```bash
# Install Vercel CLI
npm i -g vercel

# Run locally with serverless functions
vercel dev
```

---

## 📁 Project Structure

```
meetle-app/
├── api/
│   └── meetle.js          # Serverless API (keeps API key secure)
├── public/
│   └── favicon.svg        # Beetle favicon
├── src/
│   ├── App.jsx            # Main Meetle component
│   └── main.jsx           # React entry point
├── index.html             # HTML shell
├── package.json           # Dependencies
├── vite.config.js         # Vite build config
├── vercel.json            # Vercel routing config
└── .env.example           # Environment variable template
```

---

## 🔮 Future Ideas
- [ ] Google Places API for real-time place data
- [ ] Map showing both locations + midpoint
- [ ] 3+ party support
- [ ] Filters: kid-friendly, outdoor, hours, cuisine
- [ ] Share results via link
- [ ] "Use my location" GPS button
