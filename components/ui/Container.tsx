type ContainerProps = {
  children: React.ReactNode;
  className?: string;
};

export function Container({ children, className = "" }: ContainerProps) {
  return (
    <div className={`mx-auto w-full max-w-[1200px] px-5 md:px-6 lg:px-10 ${className}`}>
      {children}
    </div>
  );
}
