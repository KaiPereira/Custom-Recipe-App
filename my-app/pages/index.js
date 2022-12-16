import Head from 'next/head'
import Image from 'next/image'
import React from "react"
import { Configuration, OpenAIApi } from "openai";
const config = new Configuration({ apiKey: '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' });
const openai = new OpenAIApi(config);

export default function Home() {
  const [content, changeContent] = React.useState()
  const [input, changeInput] = React.useState()

  const prompt = `
    Generate a list of recipes using the ingredients and the format below:

    ingredients: ${input}.

    Recipe name, ingredients using precise mesurements, instructions.
    `;

    const generate = async (prompt) => {
        
        const completion = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: prompt,
            max_tokens: 1443
        });

        changeContent(completion.data.choices[0].text)
    }

    function changeInputFunction(e) {
      changeInput(e.target.value)
    }


  return (
    <div className="main">
      <p>Ingredients</p>
      <input type="text" onChange={changeInputFunction} />
      <p>{content}</p>
      <button onClick={() => generate(prompt)}>Generate a Recipe</button>
    </div>
  )
}
