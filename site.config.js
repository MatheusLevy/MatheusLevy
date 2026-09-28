/* ---------------------------------------------------------------------------
 *  EDIT THIS FILE — and (almost) nothing else.
 *  Everything on the page is rendered from the object below.
 *  Delete any section you don't want: it disappears from the page and the nav.
 * ------------------------------------------------------------------------- */

window.SITE = {
  /* ---- Basics ---------------------------------------------------------- */
  name: "Matheus Levy",
  // Rotating taglines in the hero. Add as many as you like.
  roles: [
    "Deep Learning Researcher",
    "PhD student @ PUC-Rio",
    "Computer Vision",
    "Professional Unemployed",
  ],
  location: "Rio de Janeiro, Brazil",
  // Shown in the browser tab and in link previews.
  tabTitle: "Matheus Levy — Deep Learning Researcher",
  description:
    "Matheus Levy — PhD student and deep learning researcher at Tecgraf / PUC-Rio.",
  // Path or URL. Square images look best. Leave "" to show your initials instead.
  avatar: "",
  // Brand color for the whole site. Any CSS color. Used as-is for filled
  // elements; the dark theme lightens it automatically for readable text.
  // Courier blue by default (black / white / blue palette).
  accent: "#2e3192",

  /* ---- Hero ------------------------------------------------------------ */
  intro:
    "PhD student in Computing at <strong>PUC-Rio</strong>, researching neural " +
    "surface representations at <strong>Tecgraf</strong> — Gaussian Splatting, " +
    "signed and unsigned distance fields, and computer vision in general. " +
    "Before that, medical imaging and web development at UFMA.",

  // Buttons under the intro. `primary: true` gives the filled style.
  actions: [
    { label: "Get in touch", href: "https://www.linkedin.com/in/matheus-levy/", primary: true },
    { label: "GitHub", href: "https://github.com/MatheusLevy" },
    { label: "SIBGRAPI 2026 tutorial", href: "sibgrapi2026/" },
  ],

  /* ---- Status readout (the panel under your photo) ---------------------- */
  // Delete this whole block to hide it.
  status: {
    label: "Current status",
    value: "PhD in progress",
    detail: "Tecgraf / PUC-Rio — Rio de Janeiro",
    href: "", // optional link
  },

  /* ---- Social links (listed in the contact panel) ----------------------- */
  // `label` is what's shown; `icon` is only a fallback label now.
  socials: [
    { icon: "github", label: "GitHub", href: "https://github.com/MatheusLevy" },
    { icon: "linkedin", label: "LinkedIn", href: "https://www.linkedin.com/in/matheus-levy/" },
  ],

  /* ---- Quick facts strip ----------------------------------------------- */
  facts: [
    { value: "10", label: "papers" },
    { value: "5", label: "years in research" },
    { value: "3", label: "accepted in 2026" },
  ],

  /* ---- About ----------------------------------------------------------- */
  about: {
    title: "About",
    // Each string is a paragraph. Inline HTML is allowed.
    body: [
      "I'm a PhD student in Computing (Machine Learning) at PUC-Rio, working at " +
      "<strong>Tecgraf</strong> on how neural networks represent 3D surfaces: " +
      "3D and 2D Gaussian Splatting, signed and unsigned distance fields, and " +
      "the computer vision around them.",
      "Before Rio I spent four years at UFMA in São Luís. At the Vision Image " +
      "Processing Lab I did medical imaging — glaucoma staging from OCT volumes, " +
      "kidney and tumour segmentation, chest X-ray classification, parasite eggs " +
      "under the microscope. At the Applied Computing Group (NCA) I built web " +
      "apps and CI/CD pipelines.",
      "On a long enough timeline the survival rate for everyone drops to zero. " +
      "Until then: papers, code, and the occasional web app.",
    ],
    // Optional little list on the side. Set to [] to hide.
    highlights: [
      "Currently: <strong>PhD @ PUC-Rio / Tecgraf</strong>",
      "Previously: <strong>VIPLab</strong> and <strong>NCA</strong> — UFMA",
      "Languages: Portuguese, English",
      "Certified: New Professional Pentest",
    ],
  },

  /* ---- Skills ---------------------------------------------------------- */
  skills: {
    title: "Loadout",
    groups: [
      {
        name: "3D & Vision",
        items: ["3DGS", "2DGS", "SDF", "UDF", "Object detection", "Segmentation", "Medical imaging"],
      },
      {
        name: "Deep learning",
        items: ["PyTorch", "TensorFlow", "Transformers", "YOLO", "MMDetection", "Faster R-CNN", "HRNet", "U-Net"],
      },
      {
        name: "Web",
        items: ["Angular", "Next.js", "TypeScript", "HTML", "CSS", "Leaflet"],
      },
      {
        name: "Data & tooling",
        items: ["Python", "Pandas", "NumPy", "GeoPandas", "Plotly", "Folium", "Dash", "Streamlit", "GitLab CI/CD"],
      },
    ],
  },

  /* ---- Projects -------------------------------------------------------- */
  // Used for publications. Leave `href` empty for papers with no link yet.
  projects: {
    title: "Publications",
    // Prefix for the number on each card. Try "PROJECT", "REF." or "NO."
    numberLabel: "PAPER NO.",
    items: [
      {
        name: "Neural Implicit Surfaces via Nested Multiscale Residuals",
        blurb: "NeurIPS 2026 — accepted.",
        tags: [{ text: "NeurIPS", highlight: true }, "2026", "Implicit surfaces"],
        href: "",
      },
      {
        name: "Beyond Watertight Geometry: Neural Unsigned Distance Fields as a General Surface Representation",
        blurb: "SIBGRAPI 2026 — accepted. Tutorial slides and CPU notebooks available.",
        tags: ["SIBGRAPI", "2026", "UDF"],
        href: "sibgrapi2026/",
      },
      {
        name: "From V-JEPA to LeWorldModel: A Survey on Accessible Video World Models",
        blurb: "SIBGRAPI 2026 — accepted.",
        tags: ["SIBGRAPI", "2026", "Survey"],
        href: "",
      },
      {
        name: "Neural Network Ensemble for Detecting Parasite Eggs in Microscopic Images",
        blurb: "Procedia Computer Science, 2025. First author.",
        tags: ["2025", "Detection", "Microscopy"],
        href: "https://doi.org/10.1016/j.procs.2025.02.174",
      },
      {
        name: "DualAttentionNet: A Convolutional Neural Network for Thoracic Disease Classification in Chest X-Rays",
        blurb: "Procedia Computer Science, 2025.",
        tags: ["2025", "Classification", "X-ray"],
        href: "https://doi.org/10.1016/j.procs.2025.02.181",
      },
      {
        name: "A PPM-based UNet for Tumour and Kidney Segmentation in CT Scans",
        blurb: "Computer Methods in Biomechanics and Biomedical Engineering: Imaging & Visualization, 2023.",
        tags: ["2023", "Segmentation", "CT"],
        href: "https://doi.org/10.1080/21681163.2023.2198047",
      },
      {
        name: "Glaucoma Stage Classification Using OCT Volumes and 3D CNNs",
        blurb: "SBCAS 2022. First author.",
        tags: ["SBCAS", "2022", "OCT"],
        href: "https://doi.org/10.5753/sbcas.2022.222659",
      },
      {
        name: "PPM-UNet: A Convolutional Neural Network for Kidney Segmentation in CT Images",
        blurb: "SBCAS 2022.",
        tags: ["SBCAS", "2022", "Segmentation"],
        href: "https://doi.org/10.5753/sbcas.2022.222656",
      },
      {
        name: "Optimizing a DenseNet-Based CNN for COVID-19 Diagnosis",
        blurb: "SBCAS 2022.",
        tags: ["SBCAS", "2022", "Classification"],
        href: "https://doi.org/10.5753/sbcas.2022.222666",
      },
      {
        name: "Applying Multi-Instance Learning (MIL) to Breast Cancer Diagnosis in Histopathological Images",
        blurb: "SBCAS 2022.",
        tags: ["SBCAS", "2022", "Histopathology"],
        href: "https://doi.org/10.5753/sbcas.2022.222673",
      },
    ],
  },

  /* ---- Experience / timeline ------------------------------------------- */
  experience: {
    title: "Delivery log",
    items: [
      {
        period: "2025 — now",
        role: "Deep Learning Researcher",
        org: "Tecgraf / PUC-Rio",
        orgHref: "https://www.tecgraf.puc-rio.br/",
        status: "In transit",   // shown as a small chip; omit to hide
        active: true,           // highlights the chip in the accent color
        detail:
          "PhD research on 3DGS, 2DGS, SDFs, UDFs and computer vision. " +
          "Three papers accepted for 2026: one at NeurIPS, two at SIBGRAPI.",
      },
      {
        period: "2025 — now",
        role: "Web Developer",
        org: "Tecgraf / PUC-Rio",
        orgHref: "https://www.tecgraf.puc-rio.br/",
        status: "In transit",
        active: true,
        detail: "Web development with Angular, TypeScript, HTML, CSS and Leaflet.",
      },
      {
        period: "2025 — now",
        role: "PhD in Computing, Machine Learning",
        org: "PUC-Rio",
        status: "In transit",
        active: true,
      },
      {
        period: "2024 — 2025",
        role: "Senior Software Engineer",
        org: "Applied Computing Group — NCA-UFMA",
        status: "Delivered",
        detail:
          "Front-end development with Next.js: new components, code review and " +
          "bug fixing. Automated CI/CD workflows on GitLab.",
      },
      {
        period: "2023 — 2025",
        role: "Computer Vision Researcher",
        org: "Vision Image Processing Laboratory — UFMA",
        status: "Delivered",
        detail:
          "Improved HRNet for small-object detection, designed a composed loss " +
          "for multi-stage detection, and built a multi-branch network for X-ray " +
          "classification. YOLO, MMDetection, Faster R-CNN, Transformers.",
      },
      {
        period: "2023 — 2025",
        role: "MSc in Computer Science, Machine Learning",
        org: "UFMA — Federal University of Maranhão",
        status: "Delivered",
      },
      {
        period: "2022",
        role: "Spatial Data Engineer",
        org: "Applied Computing Group — NCA-UFMA",
        status: "Delivered",
        detail:
          "Python web apps with Dash and Streamlit. Geographic data processing " +
          "with GeoPandas, Pandas, NumPy, Plotly and Folium.",
      },
      {
        period: "2021 — 2022",
        role: "Computer Vision Research Intern",
        org: "Vision Image Processing Laboratory — UFMA",
        status: "Delivered",
        detail:
          "Computer vision for medicine: a 3D CNN approach that classifies " +
          "glaucoma into three stages (non-glaucoma, early/middle, advanced).",
      },
      {
        period: "2019 — 2023",
        role: "BSc in Computer Science",
        org: "UFMA — Federal University of Maranhão",
        status: "Delivered",
      },
      {
        period: "2016 — 2019",
        role: "Technical Diploma in Informatics",
        org: "IFMA — Federal Institute of Maranhão",
        status: "Delivered",
      },
    ],
  },

  /* ---- Contact --------------------------------------------------------- */
  contact: {
    title: "Open a channel",
    body:
      "Open to research collaborations and interesting problems in 3D vision " +
      "and deep learning. The fastest way to reach me is LinkedIn.",
    email: "",
  },

  /* ---- Footer ---------------------------------------------------------- */
  footer: {
    note: "Keep on keeping on.",
    // Set to "" to hide the source link.
    sourceHref: "",
  },

  /* ---- Fun ------------------------------------------------------------- */
  // Type this word anywhere on the page for a small surprise. "" disables it.
  easterEgg: "party",
};
