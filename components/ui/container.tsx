interface ContainerProps {
  children: React.ReactNode;
}

const Container: React.FC<ContainerProps> = ({
  children
}) => {
  return ( 
    <div className="w-11/12 max-w-7xl mx-auto">
      {children}
    </div>
   );
};

export default Container;
