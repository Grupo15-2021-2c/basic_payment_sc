CREATE TABLE WALLET (
    ID            SERIAL PRIMARY KEY,
    USER_ID         VARCHAR(5000)  NOT NULL UNIQUE,
    PRIVATE_KEY    VARCHAR(1000) NOT NULL,
    ADDRESS     VARCHAR(1000) NOT NULL,
);

CREATE TABLE DEPOSIT (
                              id serial4 NOT NULL,
                              wallet_id varchar(5000) NOT NULL,
                              amount float8 NOT NULL,
                              "month" int4 NOT NULL,
                              "year" int4 NOT NULL,
                              CONSTRAINT deposit_pkey PRIMARY KEY (id),
                              CONSTRAINT deposit_un UNIQUE (wallet_id, month, year)
);
