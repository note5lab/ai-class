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


    const name = event.target.name.value;
    const age = event.target.age.value;
    const topic = event.target.topic.value;

    const response = await axios.post("/api/create-story", {
      name,
      age,
      topic
    })
    // console.log(response.data.answer)
    setAnswer(response.data.answer)
    setIsLoading(false);

  }

  return (
    <div>
      <form onSubmit={note} className="flex flex-col">

        <input className="border-slate-500" type="text" name="name" placeholder="กรอกชื่อ" />

        <input className="border-slate-500" type="number" name="age" placeholder="กรอกอายุ" />

        <input className="border-slate-500" type="text" maxLength="20" name="topic" placeholder="กรอกหัวข้อที่ต้องการ" />

        <button type="submit" disabled={isLoading}>{isLoading ? 'Loading' : 'Submit'}</button>

      </form>
      <p className="p-4">{isLoading ? 'Loading...' : ''}</p>
      <p className="p-4">{answer}</p>
    </div>
  );
}
