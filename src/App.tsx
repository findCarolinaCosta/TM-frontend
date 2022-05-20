import React, { FormEvent, useEffect, useState } from 'react';
import edit from './assets/edit.svg';
import trash from './assets/trash.svg';
import { api } from './service/api';

interface ITask {
  id: string;
  task: string;
  status: number;
  createdAt: string;
}

enum Status {
  pendente = 0,
  'em andamento' = 1,
  pronto = 2,
}

const status: string[] = ['pendente', 'em andamento', 'pronto'];

export function App() {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [taskValue, setTaskValue] = useState<string>('');
  const [taskStatus, setTaskStatus] = useState<Status>(Status.pendente);

  useEffect(() => {
    api.get('/tasks').then((response) => {
      setTasks(response.data);
    });
  }, []);

  const handleSendTask = (e: FormEvent) => {
    e.preventDefault();
    api
      .post('/task', {
        task: taskValue,
        status: taskStatus,
      })
      .then((response) => {
        setTasks((prevState) => [...prevState, response.data]);
      });
  };

  return (
    <div className="text-center">
      <header className=" p-[80px] text-center bg-[#CC73FF] text-white">
        <h1 className="animate__animated animate__bounce">
          Gerenciador de tarefas
        </h1>
      </header>
      <main>
        <section className="m-auto bg-[#D6D6D6] p-[30px] max-w-[60%]">
          <p id="funcionamento" className="animate__animated animate__zoomIn">
            Clique duas vezes em uma tarefa para editar
          </p>
        </section>
        <section className="flex flex-row justify-center items-center flex-wrap">
          <input
            type="text"
            className="max-w-[310px] mt-[50px] mb-[50px] ml-0 mr-0"
            placeholder="Tarefa..."
            onChange={({ target }) => setTaskValue(target.value)}
          />
          <label htmlFor="status" className="p-5">
            Status:
            <select
              id="status"
              className="m-3"
              onChange={({ target }) => {
                setTaskStatus(Status[`${target.value}`]);
              }}
            >
              {status.map((item) => {
                return <option>{item}</option>;
              })}
            </select>
          </label>
          <button
            type="submit"
            onClick={handleSendTask}
            className="mt-0 mb-0 mr-[10px] ml-[10px] bg-[#9b4dca] pr-3 pl-3 rounded-md text-xl hover:bg-[#CC73FF]"
          >
            +
          </button>
        </section>
        <section>
          {tasks.map((task) => {
            return (
              <section className="flex justify-center items-center p-3 gap-2">
                <ol>
                  <li className="mr-4">{task.task}</li>
                </ol>
                <button type="button">
                  <img
                    src={edit}
                    alt="Editar tarefa"
                    className="w-[20px] h-[20px]"
                  />
                </button>
                <button type="button">
                  <img
                    src={trash}
                    alt="Editar tarefa"
                    className="w-[20px] h-[20px]"
                  />
                </button>
              </section>
            );
          })}
        </section>
        <section>
          <button
            type="button"
            className=' className=" bg-[#9b4dca] p-2 rounded-md text-xl hover:bg-[#CC73FF]"'
          >
            Salvar tarefas
          </button>
        </section>
      </main>
      <footer className="mt-[200px] p-[40px] bg-[#CC73FF] text-white absolute w-full bottom-0">
        <p> &copy; Ebytr, 2021</p>
      </footer>
    </div>
  );
}
