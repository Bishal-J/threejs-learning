import { projects } from "./utils/projects-data";

const container = document.getElementById("projects") as HTMLElement;

container.innerHTML = projects
  .map(
    (project) => `
      <article
        class="group relative flex min-h-75 flex-col overflow-hidden rounded-3xl border border-slate-800 bg-linear-to-br from-slate-900 via-slate-900 to-slate-950 p-7 transition-all duration-300 hover:-translate-y-2 hover:border-sky-500/70 hover:shadow-[0_20px_60px_-15px_rgba(14,165,233,0.25)]"
      >
        <!-- Glow -->
        <div
          class="absolute -right-12 -top-12 h-36 w-36 rounded-full bg-sky-500/10 blur-3xl transition group-hover:bg-sky-500/20"
        ></div>

        <!-- Top -->
        <div class="relative z-10 flex items-start justify-between">
          <span
            class="rounded-full border border-sky-500/20 bg-sky-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-sky-400"
          >
            Lesson ${project.lesson}
          </span>

          <span class="text-3xl opacity-70 transition group-hover:rotate-6">
            🧊
          </span>
        </div>

        <!-- Content -->
        <div class="relative z-10 mt-6 flex-1">
          <h2
            class="text-2xl font-bold tracking-tight text-white transition group-hover:text-sky-300"
          >
            ${project.title}
          </h2>

          <p class="mt-4 text-sm leading-7 text-slate-400">
            ${project.description}
          </p>
        </div>

        <!-- Bottom -->
        <div
          class="relative z-10 mt-8 flex items-center justify-between border-t border-slate-800 pt-5"
        >
          <span
            class="rounded-md bg-slate-800 px-3 py-1 text-xs font-medium text-slate-300"
          >
            Three.js
          </span>

          <a
            href="${project.link}"
            class="inline-flex items-center gap-2 rounded-xl bg-sky-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-sky-400"
          >
            Open
            <span class="transition group-hover:translate-x-1">→</span>
          </a>
        </div>
      </article>
    `,
  )
  .join("");
