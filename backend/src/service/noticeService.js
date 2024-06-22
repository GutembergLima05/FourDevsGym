import { formatInTimeZone } from 'date-fns-tz';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

// Função para formatar uma data em um fuso horário específico
export function formatDateInTimeZone(date, timeZone = 'America/Sao_Paulo', formatString = 'dd/MM/yyyy HH:mm:ss') {
    return formatInTimeZone(date, timeZone, formatString, { locale: ptBR });
}

// Função para remover horas de uma data
export function removeHoursFromDate(date, hoursToRemove = 0) {
    const dateWithoutHours = new Date(date);
    dateWithoutHours.setHours(dateWithoutHours.getHours() - hoursToRemove);
    return dateWithoutHours;
}

// Função que encapsula a formatação das datas de criação, atualização e expiração
export function formatDates(dataCriacao, dataAtualizacao, dataExpiracao, hoursToRemoveFromAtualizacao = 0, timeZone = 'America/Sao_Paulo', formatString = 'dd/MM/yyyy HH:mm:ss') {
    const formattedDates = {
        data_criacao: formatDateInTimeZone(dataCriacao, timeZone, formatString),
        data_atualizacao: formatDateInTimeZone(removeHoursFromDate(dataAtualizacao, hoursToRemoveFromAtualizacao), timeZone, formatString)
    };

    if (dataExpiracao) {
        formattedDates.data_expiracao = formatDateInTimeZone(dataExpiracao, timeZone, formatString);
    }

    return formattedDates;
}