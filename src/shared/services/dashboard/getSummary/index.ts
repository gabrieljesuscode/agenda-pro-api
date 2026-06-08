import { prisma } from '../../../../database/prisma/prisma';
import { AppError } from '../../../../errors/AppError';


const appointmentsInterval = async (
  userId: string,
  startDay: number,
  endDay = startDay,
  month: number | undefined = undefined,
  year: number | undefined = undefined
) => {

  // Dia atual
  const todayDate = new Date();

  year = year !== undefined ? year : todayDate.getFullYear();
  month = month !== undefined ? month : todayDate.getMonth();

  // Array com agendamentos do mesmo dia  
  const start = new Date(
    year,
    month,
    startDay,
    0, 0, 0, 0 // Horário inicial do dia
  );

  const end = new Date(
    year,
    month,
    endDay,
    23, 59, 59, 999 // Horário final do dia
  );


  return await prisma.appointment.count({
    where: {
      userId,
      date: {
        gte: start,
        lte: end,
      }
    }
  });
};



export const getSummary = async (userId: string) => {
  // Procura o user e lança erro se não existir
  const user = await prisma.user.findUnique({
    where: {
      id: userId
    }
  });

  if (!user) throw new AppError('Usuário não encontrado', 404);


  const totalClients = await prisma.client.count({
    where: {
      userId
    }
  });

  const totalAppointments = await prisma.appointment.count({
    where: {
      userId
    }
  });

  // Array com agendamentos do mesmo dia  
  const now = new Date();

  const appointmentsToday = await appointmentsInterval(
    userId,
    now.getDate()
  );

  const finalDayOfMonth = new Date(
    now.getFullYear(),
    now.getMonth() + 1,
    0
  ).getDate();

  const appointmentsThisMonth = await appointmentsInterval(
    userId,
    1,
    finalDayOfMonth,
    now.getMonth() // JS usa meses de 0 a 11
  );

  // Retorna o summary do user 
  return {
    totalClients,
    totalAppointments,
    appointmentsToday,
    appointmentsThisMonth
  };
  // return {
  //   'totalClients': 12,
  //   'totalAppointments': 31,
  //   'appointmentsToday': 4,
  //   'appointmentsThisMonth': 18
  // }
}; 
