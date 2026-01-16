'use client';

import { useEffect, useState } from 'react';
import styles from './page.module.css';

type Medic = { id: number; name: string | null; crm: string; specialty: string | null };

function toBRDateTime(value: string) {
  if (!value) return '';
  const [date, time] = value.split('T');
  const [yyyy, mm, dd] = date.split('-');
  return `${dd}/${mm}/${yyyy} ${time}`;
}

export default function Page() {
  const API = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001';

  const [medics, setMedics] = useState<Medic[]>([]);
  const [showForm, setShowForm] = useState(false);

  // form
  const [idMedic, setIdMedic] = useState<number | ''>('');
  const [pacient, setPacient] = useState('');
  const [dataHoraLocal, setDataHoraLocal] = useState('');

  async function loadMedics() {
    const res = await fetch(`${API}/medics`, { cache: 'no-store' });
    const data = await res.json();
    console.log('MEDICS RESPONSE:', data);

    setMedics(Array.isArray(data) ? data : (data?.data ?? []));
  }

  useEffect(() => {
    loadMedics().catch(() => alert('Erro ao carregar médicos'));
  }, []);

  async function agendar() {
    if (!idMedic) return alert('Selecione um médico');
    if (!pacient.trim()) return alert('Digite o pacient');
    if (!dataHoraLocal) return alert('Selecione data e hora');

    const body = {
      idMedic,
      pacient,
      dataHoraConsulta: toBRDateTime(dataHoraLocal), // DD/MM/AAAA HH:mm
    };

    const res = await fetch(`${API}/consults`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

      console.log('CONSULT ERROR:', res);


    if (!res.ok) return alert('Erro ao agendar');

    alert('Consulta agendada!');
    setShowForm(false);
    setIdMedic('');
    setPacient('');
    setDataHoraLocal('');
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>Lista de médicos</h2>
        <button className={styles.btn} onClick={() => setShowForm((v) => !v)}>
          Novo Agendamento
        </button>
      </div>

      <ul className={styles.list}>
        {medics.map((m) => (
          <li key={m.id}>
            {m.name ?? 'Sem nome'} — CRM {m.crm} {m.specialty ? `(${m.specialty})` : ''}
          </li>
        ))}
      </ul>

      {showForm && (
        <div className={styles.card}>
          <h3>Novo Agendamento</h3>

          <div className={styles.row}>
            <select
              className={styles.select}
              value={idMedic}
              onChange={(e) => setIdMedic(e.target.value ? Number(e.target.value) : '')}
            >
              <option value="">Selecione o médico...</option>
              {medics.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.name ?? 'Sem nome'} — CRM {m.crm}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.row}>
            <input
              className={styles.input}
              placeholder="pacient"
              value={pacient}
              onChange={(e) => setPacient(e.target.value)}
            />
          </div>

          <div className={styles.row}>
            <input
              className={styles.input}
              type="datetime-local"
              value={dataHoraLocal}
              onChange={(e) => setDataHoraLocal(e.target.value)}
            />
          </div>

          <div className={styles.small}>
            Envia pro backend como <b>DD/MM/AAAA HH:mm</b>.
          </div>

          <div style={{ marginTop: 10 }}>
            <button className={styles.btn} onClick={agendar}>
              Agendar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
