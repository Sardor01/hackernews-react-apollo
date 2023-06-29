const Link = (props: { link: { description: string; url: string } }) => {
  const { link } = props;
  return (
    <div className="border border-b-0 border-gray-500 p-1 last:border-b">
      {link.description}{' '}
      {link.url ? (
        <a href={link.url} target="_blank">
          {link.url}
        </a>
      ) : (
        ''
      )}
    </div>
  );
};

export default Link;
