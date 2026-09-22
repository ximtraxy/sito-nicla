import { PortableText, PortableTextComponents } from '@portabletext/react';
import FormattedText from './FormattedText';

interface PortableBodyProps {
  content: any;
  className?: string;
}

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="font-sans text-base sm:text-lg leading-relaxed text-neutral-300 font-light mb-6">
        {children}
      </p>
    ),
    h2: ({ children }) => (
      <h2 className="font-serif text-2xl sm:text-3xl text-neutral-100 font-normal mt-10 mb-4 tracking-wide">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="font-serif text-xl sm:text-2xl text-neutral-200 font-light mt-8 mb-3">
        {children}
      </h3>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-2 border-neutral-600 pl-6 my-8 italic font-serif text-xl sm:text-2xl text-neutral-200">
        “{children}”
      </blockquote>
    ),
  },
  marks: {
    link: ({ value, children }) => {
      const target = (value?.href || '').startsWith('http') ? '_blank' : undefined;
      return (
        <a
          href={value?.href}
          target={target}
          rel={target === '_blank' ? 'noopener noreferrer' : undefined}
          className="text-white underline underline-offset-4 hover:text-neutral-300 transition-colors"
        >
          {children}
        </a>
      );
    },
    strong: ({ children }) => <strong className="font-medium text-white">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
  },
  list: {
    bullet: ({ children }) => <ul className="list-disc list-inside space-y-2 mb-6 text-neutral-300">{children}</ul>,
    number: ({ children }) => <ol className="list-decimal list-inside space-y-2 mb-6 text-neutral-300">{children}</ol>,
  },
};

export default function PortableBody({ content, className = '' }: PortableBodyProps) {
  if (!content) return null;

  // Se il contenuto è una stringa semplice invece di blocchi PortableText
  if (typeof content === 'string') {
    return (
      <FormattedText
        text={content}
        className={`space-y-4 font-sans text-base sm:text-lg leading-relaxed text-neutral-300 font-light ${className}`}
      />
    );
  }

  // Se è un array di blocchi PortableText
  return (
    <div className={`prose-neutral max-w-none ${className}`}>
      <PortableText value={content} components={components} />
    </div>
  );
}
