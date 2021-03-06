
export default {
  CONTEXT: 'DOMAIN',
  RETRYOPTIONS: {
    retries: 5,
    factor: 2,
    minTimeout: 1 * 1000,
    randomize: true,
  },
  HELP: [
    {
      header: 'Options',
      optionList: [
        {
          name: 'help',
          description: '使用引导',
          alias: 'h',
          type: Boolean,
        },
      ],
    },
    {
      header: 'Examples',
      content: [
        {
          // desc: 's exec -- get',
          example: '$ s exec -- get',
        },
      ],
    },
  ],
  JAM_STACK_HELP: [
    {
      header: 'Options',
      optionList: [
        {
          name: 'help',
          description: '使用引导',
          alias: 'h',
          type: Boolean,
        },
      ],
    },
    {
      header: 'Examples',
      content: [
        {
          // desc: 's exec -- get',
          example: '$ s exec -- get',
        },
      ],
    },
  ],
};

