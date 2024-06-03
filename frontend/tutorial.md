# HTML IN JSX/TSX FILES

- jsx/tsx is a syntax for writing html and javascript in one file

## example

export default function Home() {
    return (
        <div>
          <h1>Hello World</h1>
        </div>
    )
}

## styling

- We will use Tailwind Css

in html, we achieve styling by giving a <div> a class e.g
      
      <div class = 'container'>

      and style it like this in our css file;

       .container {
          color: blue
       }

in tailwind, we declare styles directly within the <div> tag like so:
       
       <div className ="bg-blue-500">  the div will have a color of blue