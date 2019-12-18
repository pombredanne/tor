function run_test() {
  do_crash(
    function() {
      let appAddr = CrashTestUtils.saveAppMemory();
      crashReporter.registerAppMemory(appAddr, 32);
    },
    function(mdump, extra) {
      Assert.ok(mdump.exists());
      Assert.ok(mdump.fileSize > 0);
      Assert.ok(CrashTestUtils.dumpCheckMemory(mdump.path));
    }
  );
}