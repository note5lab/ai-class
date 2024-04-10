// /app/page.js

"use client";
import axios from "axios";
import { useState } from "react";

export default function Home() {

  const [answer, setAnswer] = useState("")
  const [isLoading, setIsLoading] = useState(false)



  async function note(event) {
    event.preventDefault();
    setIsLoading(true);


    const character = event.target.character.value;
    const vehicle = event.target.vehicle.value;
    const style = event.target.style.value;

    const response = await axios.post("/api/create-image", {
      character,
      vehicle,
      style
    })
    console.log(response.data)
    setAnswer(response.data.answer)
    setIsLoading(false);

  }

  return (
    <div>
      <form onSubmit={note} className="flex flex-col">

        <input className="border-slate-500" type="text" name="character" placeholder="กรอกตัวละครหลักของภาพ" />

        <input className="border-slate-500" type="text" name="vehicle" placeholder="กรอกว่าขี่อะไรอยู่" />

        <select name="style">
          <option value="japanese manga">Japanese Manga</option>
          <option value="disney">Disney</option>
          <option value="pixar">Pixar</option>
          <option value="anime">Anime</option>
          <option value="impressionism painting">impressionism painting</option>
        </select>

        <button type="submit" disabled={isLoading}>{isLoading ? 'Loading' : 'Submit'}</button>

      </form>
      <p className="p-4">{isLoading ? 'Loading...' : ''}</p>
      <p className="p-4">{answer}</p>
      {answer && <img src={answer} className="w-full" />}
    </div>
  );
}
