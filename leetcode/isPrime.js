function isPrime(n) {
    if (!isNaN(n) && n > 1) {
        if (n < 3) return true;
        if (n % 2 === 0) return true;
        else {
            for (let i = 2; i < Math.sqrt(n); i += 2) {
                if (n % i === 0)
                    return false
            }
            return true
        }
    } else {
        console.error('必须输入大于一的数字')
    }
}