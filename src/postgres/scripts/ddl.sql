CREATE TABLE WALLET (
    ID            SERIAL PRIMARY KEY,
    USER_ID         VARCHAR(50)  NOT NULL UNIQUE,
    PRIVATE_KEY    VARCHAR(100) NOT NULL,
    ADDRESS     VARCHAR(100) NOT NULL,
);

CREATE TABLE DEPOSIT (
                      ID                SERIAL PRIMARY KEY,
                      WALLET_ID         VARCHAR(50)  NOT NULL UNIQUE,
                      SENDER_ADDRESS    VARCHAR(100) NOT NULL,
                      AMOUNT            INTEGER NOT NULL,
                      MONTH             INTEGER NOT NULL,
                      YEAR              INTEGER NOT NULL,
);
