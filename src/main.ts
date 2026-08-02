import { projects } from "./utils/projects-data";

const container = document.getElementById("projects") as HTMLElement;

container.innerHTML = projects
  .reverse()
  .map(
    (project) => `
      <article
        class="group relative flex min-h-75 flex-col overflow-hidden rounded-3xl p-px transition-all duration-300
        ${
          project.featured
            ? "bg-linear-to-r from-amber-400 via-fuchsia-500 to-sky-500 shadow-[0_20px_60px_-15px_rgba(236,72,153,0.35)] hover:-translate-y-3"
            : "border border-slate-800 hover:-translate-y-2 hover:border-sky-500/70 hover:shadow-[0_20px_60px_-15px_rgba(14,165,233,0.25)]"
        }"
      >
        <div class="relative flex h-full min-h-75 flex-col rounded-[calc(var(--radius-3xl)-1px)] bg-linear-to-br from-slate-900 via-slate-900 to-slate-950 p-7">

          <!-- Glow -->
          <div
            class="absolute -right-12 -top-12 h-36 w-36 rounded-full ${
              project.featured ? "bg-fuchsia-500/20" : "bg-sky-500/10"
            } blur-3xl transition"
          ></div>

        
          <!-- Top -->
          <div class="relative z-10 flex items-start justify-between">
            <span
              class="rounded-full ${
                project.featured
                  ? "border border-amber-400/30 bg-amber-400/10 text-amber-300"
                  : "border border-sky-500/20 bg-sky-500/10 text-sky-400"
              } px-3 py-1 text-xs font-semibold uppercase tracking-wide"
            >
              Lesson ${project.lesson}
            </span>

            <span class="text-3xl opacity-80 transition group-hover:rotate-6">
              🧊
            </span>
          </div>

          <!-- Content -->
          <div class="relative z-10 mt-6 flex-1">
            <h2
              class="text-2xl font-bold tracking-tight ${
                project.featured
                  ? "text-amber-100 group-hover:text-amber-300"
                  : "text-white group-hover:text-sky-300"
              } transition"
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
              class="inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold transition bg-sky-500 text-slate-950 hover:bg-sky-400"
            >
              Open
              <span class="transition group-hover:translate-x-1">→</span>
            </a>
          </div>

        </div>
      </article>
    `,
  )
  .join("");
