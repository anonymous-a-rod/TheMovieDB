import React from "react";
import data from '../data/FAQ';
import Question from '../components/Question';

const FAQ = () => {
  return (
    <div>
      <div className="max-w-3xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-center text-white mb-8">Frequently Asked Questions</h2>
        <div className="bg-gray-200 rounded-lg shadow-md p-8">
          <section className='info'>
            {data.map((question) => {
              return <Question key={question.id} {...question}/>
            })}
          </section>
        </div>
      </div>
    </div>
  );
};

export default FAQ;