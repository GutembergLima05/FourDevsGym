const { format } = require('date-fns');
const { ptBR } = require('date-fns/locale');

// Função para formatar uma data em um fuso horário específico e formato brasileiro
function formatDateInTimeZone(date, timeZone = 'America/Sao_Paulo', formatString = 'dd/MM/yyyy HH:mm:ss') {
    return format(date, formatString, { locale: ptBR, timeZone });
}

// Função para remover horas de uma data
function removeHoursFromDate(date, hoursToRemove = 3) {
    const dateWithoutHours = new Date(date);
    dateWithoutHours.setHours(dateWithoutHours.getHours() - hoursToRemove);
    return dateWithoutHours;
}

// Função que encapsula a formatação das datas de criação, atualização e expiração
function formatDates(dataCriacao, dataAtualizacao, dataExpiracao, hoursToRemoveFromAtualizacao = 0, timeZone = 'America/Sao_Paulo', formatString = 'dd/MM/yyyy HH:mm:ss') {
    const formattedDates = {
        data_criacao: formatDateInTimeZone(dataCriacao, timeZone, formatString),
        data_atualizacao: formatDateInTimeZone(removeHoursFromDate(dataAtualizacao, hoursToRemoveFromAtualizacao), timeZone, formatString)
    };

    if (dataExpiracao) {
        formattedDates.data_expiracao = formatDateInTimeZone(dataExpiracao, timeZone, formatString);
    }

    return formattedDates;
}

// Função para formatar datas específicas de estudantes
function formatDatesStudent(dataCriacao, dataAtualizacao, dataNascimento, dataInicioPlano, hoursToRemoveFromAtualizacao = 0, timeZone = 'America/Sao_Paulo', formatString = 'dd/MM/yyyy HH:mm:ss') {
    const formattedDates = {
        data_inicio_plano: formatDateInTimeZone(dataInicioPlano, timeZone, formatString),
        nascimento: formatDateInTimeZone(dataNascimento, timeZone, formatString),
        data_criacao: formatDateInTimeZone(dataCriacao, timeZone, formatString),
        data_atualizacao: formatDateInTimeZone(removeHoursFromDate(dataAtualizacao, hoursToRemoveFromAtualizacao), timeZone, formatString)
    };

    return formattedDates;
}

module.exports = {
    formatDateInTimeZone,
    removeHoursFromDate,
    formatDates,
    formatDatesStudent
};
