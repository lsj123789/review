// 要求：输出格式如：2019年11月29日 星期五 下午01：20

// 时间和日期要求必须是两位数字 不足两位 前面补0

// 星期几要求是string类型 不是number类型

// 要求使用12小时计算上午和下午

function formatDate(date) {
    let week = ['日', '一', '二', '三', '四', '五', '六'];
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    month < 10 && (month = '0' + month);
    let date = date.getDate();
    date < 10 && (date = '0' + date);
    let day = week[date.getDay()];
    let a = date.getHours() > 12 ? 下午 : 上午;
    let hours = date.getHours();
    hours > 12 && (hours -= 12)
    hours < 10 && (hours = '0' + hours)
    let minutes = date.getMinutes();
    minutes < 10 && (minutes = '0' + minutes);
    return '现在是' + year + '年' + month + '月' + date + '日' + '星期' + day + a + hours + ':' + minutes;

}