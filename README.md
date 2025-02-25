<div align="center">
  <!-- <img src="public/Fidzy-logo.png" alt="Fidzy Logo" width="120" height="120" /> -->
  
  # Fidzy: Customizable Content Builder
  
  💬 **Design. Customize. Share.**  
  Create beautiful, interactive content tailored to your brand and audience.
</div>

## ✨ Overview

Fidzy is a versatile web application that allows you to create customized content with different design templates. Whether you need to collect customer feedback, generate receipts, create invoices, design e-bills, craft party invitations, or build promotional brochures, Fidzy provides an intuitive interface to design content that matches your brand identity.

## 🎨 Features

- **Multiple Design Templates**: Choose from Modern, Playful, or Cafe design themes
- **Versatile Content Types**: Create feedback forms, receipts, invoices, e-bills, party invites, promotional materials, and more
- **Real-time Preview**: See changes instantly as you customize your content
- **User Information Customization**: Personalize content with user names, points, and other relevant details
- **Dynamic Field Management**: Add, remove, and configure different types of fields based on your content needs
- **Responsive Layout**: Split-screen interface with resizable panels for easy editing
- **Smooth Animations**: Polished user experience with motion effects

## 📄 Content Types

Fidzy supports a wide range of content types, including:

- **Feedback Forms**: Collect customer opinions and ratings
- **Receipts & Invoices**: Generate professional transaction records
- **E-Bills**: Create digital billing documents
- **Party Invitations**: Design engaging event invites
- **Promotional Brochures**: Craft marketing materials
- **Surveys**: Build custom questionnaires
- **Digital Cards**: Create greeting cards and announcements
- **Certificates**: Design recognition and achievement documents

## 🛠️ Built With

| Technology | Description |
|------------|-------------|
| ![Next.js](https://img.shields.io/badge/next.js-%23000000.svg?style=for-the-badge&logo=nextdotjs&logoColor=white) | Next.js for a robust React framework |
| ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) | React for building the user interface |
| ![Tailwind CSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white) | Tailwind CSS for styling |
| ![shadcn/ui](https://img.shields.io/badge/shadcn/ui-000000?style=for-the-badge&logo=shadcnui&logoColor=white) | shadcn/ui for accessible component system |
| ![Zustand](https://img.shields.io/badge/zustand-brown?style=for-the-badge) | Zustand for state management |
| ![Motion](https://img.shields.io/badge/motion-purple?style=for-the-badge) | Motion for smooth animations |

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- pnpm package manager

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/Fidzy.git
   cd Fidzy
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Start the development server:
```bash
pnpm dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## 🧩 Project Structure

```
Fidzy/
├── src/
│   ├── app/
│   │   └── page.tsx         # Main application page
│   ├── components/
│   │   ├── content/         # Content design templates
│   │   │   ├── ModernDesign.tsx
│   │   │   ├── PlayfulDesign.tsx
│   │   │   ├── CafeDesign.tsx
│   │   │   └── types.ts     # Shared types for content components
│   │   └── ui/              # UI components from shadcn
│   └── store/
│       └── useFormStore.ts  # Zustand store for content state management
├── public/
└── package.json
```

## 💡 Usage

1. **Choose Content Type**: Select the type of content you want to create
2. **Select a Design Template**: Choose from Modern, Playful, or Cafe designs in the right panel
3. **Customize Information**: Edit user details, company information, and other relevant data
4. **Manage Content Fields**: Add, remove, or edit fields based on your content needs
5. **Preview Your Content**: See your changes reflected instantly in the left panel
6. **Export or Share**: (Coming soon) Export your content or get a shareable link

## 🔮 Roadmap

- [ ] Add more design templates
- [ ] Implement field type customization
- [ ] Add theme color customization
- [ ] Create export functionality (PDF, PNG, etc.)
- [ ] Add sharing capabilities
- [ ] Implement user authentication
- [ ] Add content analytics
- [ ] Create a gallery of templates

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

Distributed under the MIT License. See `LICENSE` for more information.

---

<div align="center">
  <p>Made with ❤️ for better content creation experiences</p>
</div>
