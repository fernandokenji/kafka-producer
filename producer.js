import { Kafka } from "kafkajs";
import { randomUUID } from "node:crypto";

async function kafkaProducerMessage() {
  const kafka = new Kafka({
    clientId: 'notifications',
    brokers: ['valid-dassie-11134-us1-kafka.upstash.io:9092'],
    sasl: {
      mechanism: 'scram-sha-256',
      username: 'dmFsaWQtZGFzc2llLTExMTM0JHApzowEPaFfVsS6AIoGZ3QIiGAKljeISvtXTvw',
      password: 'L3q4WW3E-Lc1Zh1aHtTxHjPFXcc7lj_DBGivKznDHgY2bny-sdFLcFX0k3v0AEYMSVFgaQ==',
    },
    ssl: true,
  })

  const producer = kafka.producer()

  const msg = JSON.stringify({
    content: 'Nova solicitação de amizade!',
    category: 'social',
    recipientId: randomUUID(),
  });

  console.log(msg);

  await producer.connect()
  await producer.send({
    topic: 'notifications.send-notifications',
    messages: [{ 
        value: msg,
      },
    ],
  });

  await producer.disconnect();
}

kafkaProducerMessage()