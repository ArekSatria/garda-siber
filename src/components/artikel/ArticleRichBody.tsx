type ArticleRichBodyProps = {
  html: string;
  className?: string;
};

export default function ArticleRichBody({
  html,
  className = "",
}: ArticleRichBodyProps) {
  return (
    <div
      className={[
        "max-w-none text-slate-700 selection:bg-blue-100 selection:text-slate-900",

        // Heading H2
        "[&_h2]:scroll-mt-32",
        "[&_h2]:mt-16",
        "[&_h2]:mb-6",
        "[&_h2]:border-b",
        "[&_h2]:border-slate-200",
        "[&_h2]:pb-4",
        "[&_h2]:text-[2rem]",
        "md:[&_h2]:text-[2.35rem]",
        "[&_h2]:font-black",
        "[&_h2]:leading-tight",
        "[&_h2]:tracking-tight",
        "[&_h2]:text-slate-950",

        // Heading H3
        "[&_h3]:scroll-mt-32",
        "[&_h3]:mt-10",
        "[&_h3]:mb-4",
        "[&_h3]:text-[1.3rem]",
        "md:[&_h3]:text-[1.5rem]",
        "[&_h3]:font-black",
        "[&_h3]:leading-snug",
        "[&_h3]:text-slate-900",

        // Paragraph
        "[&_p]:my-6",
        "[&_p]:text-[1.05rem]",
        "md:[&_p]:text-[1.08rem]",
        "[&_p]:leading-9",
        "[&_p]:text-slate-700",

        // Paragraph pertama setelah h2
        "[&_h2+p]:text-[1.12rem]",
        "md:[&_h2+p]:text-[1.16rem]",
        "[&_h2+p]:font-medium",
        "[&_h2+p]:leading-9",
        "[&_h2+p]:text-slate-800",

        // Strong
        "[&_strong]:font-extrabold",
        "[&_strong]:text-slate-950",

        // Link
        "[&_a]:font-semibold",
        "[&_a]:text-[#0F52BA]",
        "[&_a]:underline",
        "[&_a]:decoration-blue-200",
        "[&_a]:underline-offset-4",
        "hover:[&_a]:text-[#0B3F8C]",

        // UL
        "[&_ul]:my-8",
        "[&_ul]:space-y-4",
        "[&_ul]:list-none",
        "[&_ul]:pl-0",

        "[&_ul>li]:relative",
        "[&_ul>li]:rounded-[1.35rem]",
        "[&_ul>li]:border",
        "[&_ul>li]:border-slate-200",
        "[&_ul>li]:bg-[linear-gradient(180deg,#FFFFFF_0%,#F8FAFC_100%)]",
        "[&_ul>li]:px-5",
        "[&_ul>li]:py-4",
        "[&_ul>li]:pl-14",
        "[&_ul>li]:text-[1.02rem]",
        "[&_ul>li]:leading-8",
        "[&_ul>li]:text-slate-700",
        "[&_ul>li]:shadow-[0_1px_3px_rgba(15,23,42,0.05)]",

        "[&_ul>li]:before:absolute",
        "[&_ul>li]:before:left-5",
        "[&_ul>li]:before:top-5",
        "[&_ul>li]:before:flex",
        "[&_ul>li]:before:h-6",
        "[&_ul>li]:before:w-6",
        "[&_ul>li]:before:items-center",
        "[&_ul>li]:before:justify-center",
        "[&_ul>li]:before:rounded-full",
        "[&_ul>li]:before:bg-[#EAF2FF]",
        "[&_ul>li]:before:text-sm",
        "[&_ul>li]:before:font-black",
        "[&_ul>li]:before:text-[#0F52BA]",
        "[&_ul>li]:before:content-['•']",

        // OL
        "[&_ol]:my-8",
        "[&_ol]:space-y-3",
        "[&_ol]:pl-6",
        "[&_ol]:list-decimal",
        "[&_ol]:marker:font-bold",
        "[&_ol]:marker:text-[#0F52BA]",
        "[&_ol>li]:pl-2",
        "[&_ol>li]:text-[1.02rem]",
        "[&_ol>li]:leading-8",
        "[&_ol>li]:text-slate-700",

        // Blockquote
        "[&_blockquote]:my-10",
        "[&_blockquote]:rounded-[1.75rem]",
        "[&_blockquote]:border",
        "[&_blockquote]:border-blue-100",
        "[&_blockquote]:bg-[linear-gradient(135deg,#F8FBFF_0%,#EEF4FF_100%)]",
        "[&_blockquote]:px-6",
        "[&_blockquote]:py-6",
        "[&_blockquote]:text-[1.05rem]",
        "[&_blockquote]:font-semibold",
        "[&_blockquote]:leading-8",
        "[&_blockquote]:text-slate-800",
        "[&_blockquote]:shadow-sm",

        // Code
        "[&_code]:rounded-md",
        "[&_code]:bg-slate-100",
        "[&_code]:px-2",
        "[&_code]:py-1",
        "[&_code]:font-mono",
        "[&_code]:text-[0.95em]",
        "[&_code]:text-[#0F52BA]",

        // Pre
        "[&_pre]:my-8",
        "[&_pre]:overflow-x-auto",
        "[&_pre]:rounded-[1.5rem]",
        "[&_pre]:border",
        "[&_pre]:border-slate-200",
        "[&_pre]:bg-slate-950",
        "[&_pre]:p-5",
        "[&_pre]:shadow-sm",
        "[&_pre_code]:bg-transparent",
        "[&_pre_code]:p-0",
        "[&_pre_code]:text-slate-100",

        // Image
        "[&_img]:my-10",
        "[&_img]:rounded-[1.75rem]",
        "[&_img]:border",
        "[&_img]:border-slate-200",
        "[&_img]:shadow-sm",

        // HR
        "[&_hr]:my-12",
        "[&_hr]:h-px",
        "[&_hr]:border-0",
        "[&_hr]:bg-gradient-to-r",
        "[&_hr]:from-transparent",
        "[&_hr]:via-slate-300",
        "[&_hr]:to-transparent",

        className,
      ].join(" ")}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
